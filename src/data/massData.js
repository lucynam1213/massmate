/**
 * Mass Mate — Data Assembler
 *
 * This file assembles the complete Mass text array from two content categories
 * and exports the SECTIONS definition and helper functions used by the UI.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * CONTENT ARCHITECTURE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Category 1 — Fixed Liturgy  (src/data/fixedLiturgy/)
 *   The unchanging Ordinary of the Mass. Same at every celebration.
 *   Split into four section files for maintainability.
 *   Replace mock text → update english/korean in the relevant file,
 *   set sourceStatus: 'licensed'.
 *
 *   English license: ICEL — https://www.icelweb.org
 *   Korean license:  CBCK — https://www.cbck.or.kr
 *
 * Category 2 — Daily Readings  (src/data/dailyReadings/)
 *   The Proper of the Mass — varies by date and liturgical feast.
 *   Replace mock text → connect fetchDailyReadings() in
 *   src/data/dailyReadings/index.js to a licensed lectionary API.
 *
 * Category 3 — Liturgical Calendar  (src/services/liturgicalCalendarService.js)
 *   Season, celebration title, rank, color — already fetched live from the
 *   John Romano Dorazio Liturgical Calendar API.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * DATA SHAPE  (MassTextBlock)
 * ═══════════════════════════════════════════════════════════════════════════════
 *   id              — stable unique key
 *   contentCategory — 'fixed' | 'daily'
 *   section         — matches a SECTIONS[].id
 *   subsection      — English subsection label
 *   subsectionKo    — Korean subsection label
 *   speaker         — 'priest' | 'deacon' | 'people' | 'all' |
 *                     'reader' | 'narrator' | 'choir'
 *   iconType        — 'cross' | 'fishEye' | 'combined' |
 *                     'choir' | 'neutral' | 'placeholder'
 *   order           — integer sort key (global across all sections)
 *   english         — English display text  ⚠️  mock / paraphrase
 *   korean          — Korean display text   ⚠️  mock — NOT approved by CBCK
 *   sourceStatus    — 'mock' | 'official' | 'licensed' | 'api'
 *   placeholder     — true when the slot holds variable content (homily, hymns)
 *   note            — developer note, not shown in UI
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { ALL_FIXED_TEXTS }    from './fixedLiturgy/index'
import { MOCK_DAILY_READINGS } from './dailyReadings/mockReadings'

// ─── Section definitions ──────────────────────────────────────────────────────

export const SECTIONS = [
  { id: 'introductory-rites',       label: 'Introductory Rites',       labelKo: '시작 예식', color: 'intro' },
  { id: 'liturgy-of-the-word',      label: 'Liturgy of the Word',      labelKo: '말씀 전례', color: 'word' },
  { id: 'liturgy-of-the-eucharist', label: 'Liturgy of the Eucharist', labelKo: '성찬 전례', color: 'eucharist' },
  { id: 'concluding-rites',         label: 'Concluding Rites',         labelKo: '마침 예식', color: 'concluding' },
]

// ─── Assembled Mass text ──────────────────────────────────────────────────────

/**
 * Complete Mass text array — fixed ordinary + mock daily proper, sorted by order.
 *
 * In production, the daily portion will come from fetchDailyReadings() in the
 * service layer (src/services/massService.js) rather than being assembled here.
 * This static assembly exists only for the current mock-data phase.
 */
export const massData = [
  ...ALL_FIXED_TEXTS,
  ...MOCK_DAILY_READINGS,
].sort((a, b) => a.order - b.order)

// ─── Helper functions ─────────────────────────────────────────────────────────

/** All blocks for a given section, sorted by order. */
export function getSectionData(sectionId) {
  return massData
    .filter((item) => item.section === sectionId)
    .sort((a, b) => a.order - b.order)
}

/** Unique subsections for a section, in display order. */
export function getSubsections(sectionId) {
  const items = getSectionData(sectionId)
  const seen  = new Set()
  return items
    .filter((item) => {
      if (seen.has(item.subsection)) return false
      seen.add(item.subsection)
      return true
    })
    .map((item) => ({ name: item.subsection, nameKo: item.subsectionKo }))
}

/** Number of subsections in a section. */
export function getSubsectionCount(sectionId) {
  return getSubsections(sectionId).length
}

/** Total subsection count across the whole Mass. */
export const TOTAL_SUBSECTIONS = SECTIONS.reduce(
  (sum, s) => sum + getSubsectionCount(s.id),
  0
)
