/**
 * Daily Readings — Service Entry Point
 *
 * This is the single place to connect real lectionary content.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHAT IS LIVE vs. STILL MOCK
 * ─────────────────────────────────────────────────────────────────────────────
 * Scripture citations (book/chapter/verse) come from the Catholic Readings API
 * (cpbjr, MIT-licensed, sourced from USCCB citation data — see
 * https://github.com/cpbjr/catholic-readings-api). English body text for those
 * citations comes from the World English Bible (bible-api.com), a PUBLIC DOMAIN
 * translation. This is real, date-correct scripture — but it is NOT the
 * official NABRE Lectionary for Mass translation used at the altar, which
 * remains under USCCB/ICEL copyright and requires a paid license to reproduce.
 *
 * Everything that is NOT scripture — the Collect, Prayer over the Offerings,
 * Prayer after Communion, Universal Prayer intentions, Preface, chants — is
 * proper text from the Roman Missal, also under ICEL (English) / CBCK (Korean)
 * copyright. No free or public-domain source exists for these, so they stay
 * as clearly-labeled mock placeholders (see mockReadings.js) until licensed.
 *
 * Korean scripture text has no free API source either (한국천주교중앙협의회/
 * CBCK license required), so Korean readings stay as a labeled "pending" note
 * even when the English side is live.
 *
 * On any network failure this always falls back to MOCK_DAILY_READINGS so the
 * app keeps working offline.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { MOCK_DAILY_READINGS } from './mockReadings'
import { Storage } from '../../lib/storage'

const CITATIONS_API = 'https://cpbjr.github.io/catholic-readings-api/readings'
const VERSE_API      = 'https://bible-api.com'
const CACHE_KEY      = 'daily_readings'
const KOREAN_PENDING = '(한국어 독서 본문은 준비 중입니다 — CBCK 라이선스 필요)'

// English → Korean book names. Book titles are not copyrightable, so this
// is safe to hardcode even while the passage text itself stays licensed-only.
const KOREAN_BOOK_NAMES = {
  Genesis: '창세기', Exodus: '탈출기', Leviticus: '레위기', Numbers: '민수기',
  Deuteronomy: '신명기', Joshua: '여호수아기', Judges: '판관기', Ruth: '룻기',
  '1 Samuel': '사무엘기 상권', '2 Samuel': '사무엘기 하권',
  '1 Kings': '열왕기 상권', '2 Kings': '열왕기 하권',
  '1 Chronicles': '역대기 상권', '2 Chronicles': '역대기 하권',
  Ezra: '에즈라기', Nehemiah: '느헤미야기', Tobit: '토빗기', Judith: '유딧기',
  Esther: '에스테르기', Job: '욥기', Psalms: '시편', Proverbs: '잠언',
  Ecclesiastes: '코헬렛', 'Song of Solomon': '아가', Wisdom: '지혜서',
  Sirach: '집회서', Isaiah: '이사야서', Jeremiah: '예레미야서',
  Lamentations: '애가', Baruch: '바룩서', Ezekiel: '에제키엘서',
  Daniel: '다니엘서', Hosea: '호세아서', Joel: '요엘서', Amos: '아모스서',
  Obadiah: '오바디야서', Jonah: '요나서', Micah: '미카서', Nahum: '나훔서',
  Habakkuk: '하바쿡서', Zephaniah: '스바니야서', Haggai: '하까이서',
  Zechariah: '즈카르야서', Malachi: '말라키서',
  '1 Maccabees': '마카베오기 상권', '2 Maccabees': '마카베오기 하권',
  Matthew: '마태오 복음', Mark: '마르코 복음', Luke: '루카 복음', John: '요한 복음',
  Acts: '사도행전', Romans: '로마서',
  '1 Corinthians': '코린토 1서', '2 Corinthians': '코린토 2서',
  Galatians: '갈라티아서', Ephesians: '에페소서', Philippians: '필리피서',
  Colossians: '콜로새서', '1 Thessalonians': '테살로니카 1서',
  '2 Thessalonians': '테살로니카 2서', '1 Timothy': '티모테오 1서',
  '2 Timothy': '티모테오 2서', Titus: '티토서', Philemon: '필레몬서',
  Hebrews: '히브리서', James: '야고보서', '1 Peter': '베드로 1서',
  '2 Peter': '베드로 2서', '1 John': '요한 1서', '2 John': '요한 2서',
  '3 John': '요한 3서', Jude: '유다서', Revelation: '요한 묵시록',
}

function koreanBookName(englishName) {
  return KOREAN_BOOK_NAMES[englishName] ?? englishName
}

function getLocalDateStr(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

async function fetchJSON(url, timeoutMs = 8000) {
  const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(timeoutMs) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

/** Fetches public-domain (WEB) body text for a citation. Returns null on any failure. */
async function fetchVerseText(citation) {
  try {
    const data = await fetchJSON(`${VERSE_API}/${encodeURIComponent(citation)}?translation=web`)
    const text = (data.text ?? '').replace(/\s+/g, ' ').trim()
    if (!text) return null
    return { text, bookName: data.verses?.[0]?.book_name ?? null }
  } catch {
    return null
  }
}

/**
 * Builds the citation-intro + body blocks for one scripture reading,
 * grafted onto the id/order/section/subsection/speaker/iconType of the
 * matching mock entries so layout stays identical when live data loads.
 */
function buildScriptureBlocks({ citation, introBlock, bodyBlock, introVerb }) {
  return fetchVerseText(citation).then((verse) => {
    if (!verse) return null // fall back to mock for this reading
    const bookKo = koreanBookName(verse.bookName ?? citation)
    return [
      {
        ...introBlock,
        english: `A reading from ${introVerb} ${verse.bookName ?? citation}.`,
        korean: `${bookKo}${introVerb ? '의' : ''} 말씀입니다.`,
        sourceStatus: 'api',
        note: `Live citation: ${citation}`,
      },
      {
        ...bodyBlock,
        english: verse.text,
        korean: KOREAN_PENDING,
        sourceStatus: 'api',
        note: `World English Bible (public domain) — ${citation}. Not the official NABRE Lectionary translation.`,
      },
    ]
  })
}

function findMock(id) {
  return MOCK_DAILY_READINGS.find((b) => b.id === id)
}

/**
 * Fetch daily readings for the given date.
 * Always resolves — falls back to MOCK_DAILY_READINGS wholesale, or per-reading,
 * on any network failure so the app keeps working offline.
 *
 * @param {Date} [date=new Date()]
 * @returns {Promise<MassTextBlock[]>}
 */
export async function fetchDailyReadings(date = new Date()) {
  const dateStr = getLocalDateStr(date)

  try {
    const cached = Storage.getJSON(CACHE_KEY)
    if (cached && cached.date === dateStr) return cached.blocks

    const year  = date.getFullYear()
    const mmdd  = dateStr.slice(5)
    const citations = await fetchJSON(`${CITATIONS_API}/${year}/${mmdd}.json`)
    const r = citations.readings ?? {}

    const swaps = []

    if (r.firstReading) {
      swaps.push(buildScriptureBlocks({
        citation:   r.firstReading,
        introBlock: findMock('low-fr-1'),
        bodyBlock:  findMock('low-fr-2'),
        introVerb:  'the Book of',
      }))
    }
    if (r.secondReading) {
      swaps.push(buildScriptureBlocks({
        citation:   r.secondReading,
        introBlock: findMock('low-sr-1'),
        bodyBlock:  findMock('low-sr-2'),
        introVerb:  'the Letter of Saint Paul to',
      }))
    }
    if (r.psalm) {
      swaps.push(fetchVerseText(r.psalm).then((verse) => {
        if (!verse) return null
        const psalmBlock = findMock('low-psalm-2')
        return [{
          ...psalmBlock,
          english: verse.text,
          korean: KOREAN_PENDING,
          sourceStatus: 'api',
          note: `World English Bible (public domain) — ${r.psalm}. Not the official NABRE Lectionary translation.`,
        }]
      }))
    }
    if (r.gospel) {
      swaps.push(buildScriptureBlocks({
        citation:   r.gospel,
        introBlock: findMock('low-gospel-3'),
        bodyBlock:  { ...findMock('low-gospel-3'), id: 'low-gospel-4', order: 39 },
        introVerb:  'the holy Gospel according to',
      }))
    }

    const resolved = (await Promise.all(swaps)).filter(Boolean).flat()
    const replacedIds = new Set(resolved.map((b) => b.id))

    const blocks = [
      ...MOCK_DAILY_READINGS.filter((b) => !replacedIds.has(b.id)),
      ...resolved,
    ].sort((a, b) => a.order - b.order)

    Storage.setJSON(CACHE_KEY, { date: dateStr, blocks })
    return blocks

  } catch {
    return MOCK_DAILY_READINGS
  }
}
