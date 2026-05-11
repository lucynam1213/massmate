/**
 * Daily Readings — Service Entry Point
 *
 * This is the single place to connect real lectionary content.
 * Currently returns mock data from mockReadings.js.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO CONNECT A REAL READINGS API
 * ─────────────────────────────────────────────────────────────────────────────
 * Replace the body of fetchDailyReadings() with a fetch() call to a licensed
 * lectionary source. The returned objects must match the MassTextBlock shape
 * with contentCategory: 'daily'.
 *
 * Candidate sources (all require licensing agreements):
 *   USCCB Daily Readings API   https://bible.usccb.org/bible/readings
 *   Universalis                https://universalis.com/
 *   Custom backend seeded from an approved liturgical database
 *
 * Korean readings:
 *   가톨릭 인터넷 굿뉴스  https://www.catholic.or.kr
 *   한국천주교중앙협의회   https://www.cbck.or.kr
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * ⚠️  TEMPORARY MOCK CONTENT
 * The current implementation returns static placeholder data.
 * Do not use mock readings as official liturgical content in production.
 */

import { MOCK_DAILY_READINGS } from './mockReadings'

/**
 * Fetch daily readings for the given date.
 * Returns a Promise so callers are already written for async API replacement.
 *
 * @param {Date} [date=new Date()]
 * @returns {Promise<MassTextBlock[]>}
 */
export async function fetchDailyReadings(date = new Date()) {
  // TODO: replace with licensed lectionary API call keyed by date
  // Example:
  //   const iso = `${date.getFullYear()}-${...}-${...}`
  //   const res = await fetch(`https://your-api.example.com/readings?date=${iso}`)
  //   if (!res.ok) throw new Error('Failed to load readings')
  //   return res.json()

  return MOCK_DAILY_READINGS
}
