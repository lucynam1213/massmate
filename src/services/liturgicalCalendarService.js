/**
 * Liturgical Calendar Service
 *
 * Fetches today's liturgical metadata from the public John Romano Dorazio
 * Liturgical Calendar API (no auth required).
 *
 * API reference: https://litcal.johnromanodorazio.com/api/v5
 *
 * Cache: localStorage (survives app restarts), expires at midnight local time.
 * Fallback: gracefully returns Ordinary Time when offline or API fails.
 */

import { ENV }     from '../config/env'
import { Storage } from '../lib/storage'

const CACHE_KEY = 'litcal'

// ─── Label maps ───────────────────────────────────────────────────────────────

const SEASON_LABELS = {
  ADVENT:         'Advent',
  CHRISTMASTIDE:  'Christmas Season',
  ORDINARY_TIME:  'Ordinary Time',
  LENT:           'Lent',
  EASTER_TRIDUUM: 'Easter Triduum',
  EASTERTIDE:     'Easter Season',
}

const GRADE_LABELS = {
  0: 'Weekday',
  1: 'Weekday',
  2: 'Commemoration',
  3: 'Optional Memorial',
  4: 'Memorial',
  5: 'Feast',
  6: 'Feast of the Lord',
  7: 'Solemnity',
}

const COLOR_DISPLAY = {
  green:  'Green',
  white:  'White',
  red:    'Red',
  purple: 'Purple',
  rose:   'Rose',
  gold:   'White / Gold',
  black:  'Black',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLocalDateStr(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function ordinal(n) {
  if (!n) return null
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}

function parseWeekFromKey(eventKey, seasonCode) {
  if (!eventKey) return null
  const patterns = {
    ORDINARY_TIME: /OrdinaryTime(\d+)/,
    ADVENT:        /Advent(\d+)/,
    LENT:          /Lent(\d+)/,
    EASTERTIDE:    /Easter(\d+)/,
  }
  const re = patterns[seasonCode]
  if (!re) return null
  const m = eventKey.match(re)
  return m ? parseInt(m[1], 10) : null
}

function buildWeekLabel(eventKey, seasonCode, psalterWeek) {
  const week   = parseWeekFromKey(eventKey, seasonCode)
  const season = SEASON_LABELS[seasonCode]
  if (!season) return null
  if (week) return `${ordinal(week)} Week of ${season}`
  if (psalterWeek) return `${season} · Week ${psalterWeek}`
  return season
}

// ─── Normalize ────────────────────────────────────────────────────────────────

function normalize(event) {
  const seasonCode = event.liturgical_season ?? ''
  const grade      = event.grade ?? 0
  const colors     = Array.isArray(event.color) ? event.color : []
  const colorRaw   = colors[0] ?? null
  const eventKey   = event.event_key ?? null

  return {
    title:          event.name ?? null,
    season:         SEASON_LABELS[seasonCode] ?? seasonCode,
    seasonCode,
    grade,
    rank:           GRADE_LABELS[grade] ?? 'Weekday',
    isWeekday:      grade <= 1,
    colorRaw,
    colorDisplay:   colorRaw ? COLOR_DISPLAY[colorRaw] ?? colorRaw : null,
    weekLabel:      buildWeekLabel(eventKey, seasonCode, event.psalter_week ?? null),
    psalterWeek:    event.psalter_week ?? null,
    liturgicalYear: event.liturgical_year ?? null,
    date:           event.date ? event.date.slice(0, 10) : null,
    eventKey,
    isFallback:     false,
  }
}

function makeFallback(dateStr) {
  return {
    title:          null,
    season:         'Ordinary Time',
    seasonCode:     'ORDINARY_TIME',
    grade:          1,
    rank:           'Weekday',
    isWeekday:      true,
    colorRaw:       'green',
    colorDisplay:   'Green',
    weekLabel:      'Ordinary Time',
    psalterWeek:    null,
    liturgicalYear: null,
    date:           dateStr,
    eventKey:       null,
    isFallback:     true,
  }
}

// ─── Cache (localStorage, expires at midnight) ────────────────────────────────

function readCache(year) {
  const cached = Storage.getJSON(CACHE_KEY)
  if (!cached) return null
  if (cached.year !== year) return null
  if (Date.now() > cached.expiresAt) {
    Storage.remove(CACHE_KEY)
    return null
  }
  return cached.events
}

function writeCache(year, events) {
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  Storage.setJSON(CACHE_KEY, { year, events, expiresAt: midnight.getTime() })
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch today's liturgical metadata.
 * Always resolves — returns fallback on any network or parse error.
 *
 * @param {Date} [date=new Date()]
 * @returns {Promise<LiturgyDay>}
 */
export async function fetchTodayLiturgy(date = new Date()) {
  const todayStr = getLocalDateStr(date)
  const year     = date.getFullYear()

  try {
    let events = readCache(year)

    if (!events) {
      const res = await fetch(`${ENV.LITCAL_API}/calendar/${year}`, {
        headers: { Accept: 'application/json' },
        signal:  AbortSignal.timeout(10_000),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      events = data.litcal ?? []
      writeCache(year, events)
    }

    const todayEvents = events
      .filter((e) => !e.is_vigil_mass && e.date?.slice(0, 10) === todayStr)
      .sort((a, b) => (b.grade ?? 0) - (a.grade ?? 0))

    return todayEvents.length > 0 ? normalize(todayEvents[0]) : makeFallback(todayStr)

  } catch (err) {
    if (ENV.IS_DEV) console.warn('[LiturgicalCalendar] API unavailable, using fallback:', err.message)
    return makeFallback(todayStr)
  }
}
