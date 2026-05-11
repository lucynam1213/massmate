/**
 * Mass Mate — Mass Data Service
 *
 * Single integration point for all Mass content. Components never import
 * from data files directly — they call these functions instead.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CONTENT CATEGORIES
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Fixed Liturgy  (contentCategory: 'fixed')
 *   Static import from src/data/fixedLiturgy/. Does not change between Masses.
 *   ⚠️  Currently mock text. Replace with licensed content before production.
 *   English: ICEL license required  https://www.icelweb.org
 *   Korean:  CBCK license required  https://www.cbck.or.kr
 *
 * Daily Readings  (contentCategory: 'daily')
 *   Currently served from src/data/dailyReadings/mockReadings.js.
 *   TODO: replace fetchDailyReadings() in src/data/dailyReadings/index.js
 *   with a real lectionary API call.
 *   ⚠️  Currently mock text. Do not present as official liturgical content.
 *
 * Liturgical Calendar  (handled by src/services/liturgicalCalendarService.js)
 *   Already live — fetches from the John Romano Dorazio API.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * API INTEGRATION PATH
 * ─────────────────────────────────────────────────────────────────────────────
 * When real content is available, update fetchTodayMass() to:
 *
 *   import { ALL_FIXED_TEXTS }    from '../data/fixedLiturgy'
 *   import { fetchDailyReadings } from '../data/dailyReadings'
 *
 *   export async function fetchTodayMass(date = new Date()) {
 *     const fixed = ALL_FIXED_TEXTS                    // static — no network call
 *     const daily = await fetchDailyReadings(date)     // API call for readings
 *     const texts = [...fixed, ...daily].sort((a, b) => a.order - b.order)
 *     return { date: ..., title: ..., rite: ..., sections: SECTIONS, texts }
 *   }
 *
 * The components and hooks require no changes — they already handle async loading.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * MassPayload shape:
 * {
 *   date:     string           — ISO date, e.g. "2026-05-06"
 *   title:    string           — e.g. "Sunday Mass"
 *   rite:     string           — e.g. "Roman Rite · Ordinary Form"
 *   season:   string           — e.g. "Easter"
 *   sections: Section[]        — see SECTIONS in massData.js
 *   texts:    MassTextBlock[]  — sorted by order, contentCategory on every item
 * }
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { SECTIONS, massData } from '../data/massData'

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch today's Mass data.
 * Returns a Promise so callers are already written for async API replacement.
 *
 * @param {Date} [date=new Date()]
 * @returns {Promise<MassPayload>}
 */
export async function fetchTodayMass(date = new Date()) {
  // TODO: replace massData with separate fixed + async daily fetch (see above)

  return {
    date:     date.toISOString().split('T')[0],
    title:    'Sunday Mass',              // TODO: derive from liturgical calendar
    rite:     'Roman Rite · Ordinary Form',
    season:   'Ordinary Time',           // TODO: derive from liturgical calendar
    sections: SECTIONS,
    texts:    massData,
  }
}

/**
 * Filter texts for a specific section, sorted by order.
 */
export function getSectionTexts(texts, sectionId) {
  return texts
    .filter((t) => t.section === sectionId)
    .sort((a, b) => a.order - b.order)
}

/**
 * Unique subsections for a section, in order.
 */
export function getSubsectionList(texts, sectionId) {
  const items = getSectionTexts(texts, sectionId)
  const seen  = new Set()
  return items
    .filter((t) => {
      if (seen.has(t.subsection)) return false
      seen.add(t.subsection)
      return true
    })
    .map((t) => ({ name: t.subsection, nameKo: t.subsectionKo }))
}
