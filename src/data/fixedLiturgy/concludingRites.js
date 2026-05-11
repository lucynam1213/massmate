/**
 * Fixed Liturgy — Concluding Rites
 *
 * The blessing and fixed people's response to the dismissal.
 * The dismissal formula itself varies (four options) and is in dailyReadings.
 *
 * sourceStatus values:
 *   'mock'     — placeholder text, not for production
 *   'verified' — confirmed against Korean Catholic liturgical sources
 *   'official' — licensed text from rights holder
 */

/** @type {MassTextBlock[]} */
export const FIXED_CONCLUDING_RITES = [

  // ── Blessing / 강복 ───────────────────────────────────────────────────────

  {
    id: 'cr-blessing-1',
    contentCategory: 'fixed',
    section: 'concluding-rites',
    subsection: 'Blessing',
    subsectionKo: '강복',
    speaker: 'priest',
    iconType: 'cross',
    order: 109,
    english: 'The Lord be with you.',
    korean: '주님께서 여러분과 함께.',
    sourceStatus: 'verified',
  },
  {
    id: 'cr-blessing-2',
    contentCategory: 'fixed',
    section: 'concluding-rites',
    subsection: 'Blessing',
    subsectionKo: '강복',
    speaker: 'people',
    iconType: 'fishEye',
    order: 110,
    english: 'And with your spirit.',
    korean: '또한 사제의 영과 함께.',
    sourceStatus: 'verified',
  },
  {
    id: 'cr-blessing-3',
    contentCategory: 'fixed',
    section: 'concluding-rites',
    subsection: 'Blessing',
    subsectionKo: '강복',
    speaker: 'priest',
    iconType: 'cross',
    order: 111,
    english: 'May almighty God bless you: the Father, and the Son, and the Holy Spirit.',
    korean: '전능하신 하느님, 성부와 성자와 성령께서 여기 모인 모든 이에게 강복하소서.',
    sourceStatus: 'verified',
  },
  {
    id: 'cr-blessing-4',
    contentCategory: 'fixed',
    section: 'concluding-rites',
    subsection: 'Blessing',
    subsectionKo: '강복',
    speaker: 'people',
    iconType: 'fishEye',
    order: 112,
    english: 'Amen.',
    korean: '아멘.',
    sourceStatus: 'verified',
  },

  // ── Dismissal / 파견 ──────────────────────────────────────────────────────

  {
    id: 'cr-dismissal-2',
    contentCategory: 'fixed',
    section: 'concluding-rites',
    subsection: 'Dismissal',
    subsectionKo: '파견',
    speaker: 'people',
    iconType: 'fishEye',
    order: 114,
    english: 'Thanks be to God.',
    korean: '하느님, 감사합니다.',
    sourceStatus: 'verified',
  },
]
