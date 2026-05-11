/**
 * Daily Readings — Mock Data
 *
 * These texts change every day based on the liturgical calendar.
 * They belong to the Proper of the Mass (as opposed to the Ordinary).
 *
 * ⚠️  TEMPORARY MOCK CONTENT — DO NOT USE IN PRODUCTION
 * Every text in this file is a sample or AI-generated placeholder.
 * It is here only to demonstrate the UI layout during development.
 *
 * Content categories included here:
 *   - Collect (opening prayer, varies by Sunday/feast)
 *   - First Reading (Old Testament or Acts)
 *   - Responsorial Psalm
 *   - Second Reading (Epistle, Sundays only)
 *   - Gospel Acclamation verse
 *   - Gospel
 *   - Universal Prayer intentions
 *   - Preface (varies by season/feast)
 *   - Prayer over the Offerings
 *   - Communion Chant
 *   - Prayer after Communion
 *   - Dismissal formula (one of four options)
 *   - Entrance / Offertory / Communion / Closing chant descriptions
 *
 * Replacement path:
 *   Connect fetchDailyReadings() in src/data/dailyReadings/index.js to a
 *   licensed lectionary API (e.g., USCCB API, Universalis, or a custom backend)
 *   and remove this file. The API response must return objects matching the
 *   MassTextBlock shape with contentCategory: 'daily'.
 *
 *   English source:  Lectionary for Mass (USCCB / ICEL)
 *   Korean source:   가톨릭 전례력 DB — license from 한국천주교중앙협의회 (cbck.or.kr)
 */

/** @type {MassTextBlock[]} */
export const MOCK_DAILY_READINGS = [

  // ── Entrance Chant ────────────────────────────────────────────────────────

  {
    id: 'ir-entrance-1',
    contentCategory: 'daily',
    section: 'introductory-rites',
    subsection: 'Entrance',
    subsectionKo: '입당',
    speaker: 'choir',
    iconType: 'choir',
    order: 1,
    english: 'The Entrance Chant is sung as the priest and ministers process to the altar.',
    korean: '사제와 봉사자들이 제단으로 행진할 때 입당 성가를 부릅니다.',
    sourceStatus: 'mock',
    note: 'Variable — antiphon or hymn selected by the music director.',
  },

  // ── Greeting — priest's introduction ─────────────────────────────────────

  {
    id: 'ir-greeting-3',
    contentCategory: 'daily',
    section: 'introductory-rites',
    subsection: 'Greeting',
    subsectionKo: '인사',
    speaker: 'narrator',
    iconType: 'neutral',
    order: 7,
    english: 'The priest briefly introduces the Mass of the day and invites the faithful to call to mind their sins.',
    korean: '사제는 오늘 미사를 간략히 소개하고, 신자들이 죄를 성찰하도록 초대합니다.',
    sourceStatus: 'mock',
    note: 'Rubric — actual words vary each Mass.',
  },

  // ── Collect ───────────────────────────────────────────────────────────────

  {
    id: 'ir-collect-2',
    contentCategory: 'daily',
    section: 'introductory-rites',
    subsection: 'Collect',
    subsectionKo: '본기도',
    speaker: 'priest',
    iconType: 'cross',
    order: 20,
    english: 'Grant, we pray, almighty God, that we who have been nourished by the Sacrament of your Son may know him in our midst as we gather in his name.',
    korean: '전능하신 하느님, 성자의 성사로 영양을 받은 저희가 성자의 이름으로 모인 자리에서 그분을 알아보게 하소서.',
    sourceStatus: 'mock',
    note: 'Sample Collect. Replace with the lectionary collect for the specific date.',
  },

  // ── First Reading ─────────────────────────────────────────────────────────

  {
    id: 'low-fr-1',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'First Reading',
    subsectionKo: '제1독서',
    speaker: 'reader',
    iconType: 'neutral',
    order: 22,
    english: 'A reading from the Book of Isaiah.',
    korean: '이사야서의 말씀입니다.',
    sourceStatus: 'mock',
    note: 'Book citation — varies daily.',
  },
  {
    id: 'low-fr-2',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'First Reading',
    subsectionKo: '제1독서',
    speaker: 'reader',
    iconType: 'neutral',
    order: 23,
    english: 'Thus says the Lord: Do not fear, for I have redeemed you; I have called you by name, you are mine. When you pass through the waters, I will be with you.',
    korean: '주님이 이렇게 말씀하신다. 두려워하지 마라, 내가 너를 구원하였다. 내가 너를 이름으로 불렀으니 너는 내 것이다. 물 속을 지날 때 내가 너와 함께 있겠다.',
    sourceStatus: 'mock',
    note: 'Sample from Isaiah 43. Replace with the daily lectionary reading.',
  },

  // ── Responsorial Psalm ────────────────────────────────────────────────────

  {
    id: 'low-psalm-1',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'Responsorial Psalm',
    subsectionKo: '화답 시편',
    speaker: 'choir',
    iconType: 'choir',
    order: 26,
    english: 'The Lord is my shepherd; there is nothing I shall want.',
    korean: '주님은 나의 목자, 아쉬울 것 없어라.',
    sourceStatus: 'mock',
    note: 'Psalm response — varies daily.',
  },
  {
    id: 'low-psalm-2',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'Responsorial Psalm',
    subsectionKo: '화답 시편',
    speaker: 'choir',
    iconType: 'choir',
    order: 27,
    english: 'The Lord is my shepherd; he makes me lie down in green pastures. He leads me beside still waters; he restores my soul.',
    korean: '주님은 나의 목자, 나는 아무것도 부족하지 않으리라. 푸른 풀밭에 나를 눕히시고 잔잔한 물가로 이끄시어 내 영혼을 소생시키시네.',
    sourceStatus: 'mock',
    note: 'Sample from Psalm 23.',
  },
  {
    id: 'low-psalm-3',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'Responsorial Psalm',
    subsectionKo: '화답 시편',
    speaker: 'people',
    iconType: 'fishEye',
    order: 28,
    english: 'The Lord is my shepherd; there is nothing I shall want.',
    korean: '주님은 나의 목자, 아쉬울 것 없어라.',
    sourceStatus: 'mock',
    note: 'Repeated response by the people.',
  },

  // ── Second Reading ────────────────────────────────────────────────────────

  {
    id: 'low-sr-1',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'Second Reading',
    subsectionKo: '제2독서',
    speaker: 'reader',
    iconType: 'neutral',
    order: 29,
    english: 'A reading from the Letter of Saint Paul to the Romans.',
    korean: '사도 바오로의 로마서 말씀입니다.',
    sourceStatus: 'mock',
    note: 'Daily — omitted on weekdays. Replace with the lectionary reading for the date.',
  },
  {
    id: 'low-sr-2',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'Second Reading',
    subsectionKo: '제2독서',
    speaker: 'reader',
    iconType: 'neutral',
    order: 30,
    english: 'Brothers and sisters: I am convinced that neither death, nor life, nor angels, nor rulers, nor things present, nor things to come, nor powers, nor height, nor depth, nor anything else in all creation will be able to separate us from the love of God in Christ Jesus our Lord.',
    korean: '형제 여러분, 저는 확신합니다. 죽음도 삶도, 천사들도 권세들도, 현재 것도 미래 것도, 능력들도, 높음도 깊음도, 그 밖에 어떤 피조물도 우리 주 그리스도 예수님 안에 있는 하느님의 사랑에서 우리를 떼어 놓을 수 없습니다.',
    sourceStatus: 'mock',
    note: 'Sample from Romans 8:38-39.',
  },

  // ── Gospel Acclamation verse ──────────────────────────────────────────────

  {
    id: 'low-alleluia-2',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'Gospel Acclamation',
    subsectionKo: '복음 환호송',
    speaker: 'choir',
    iconType: 'choir',
    order: 34,
    english: 'I am the way and the truth and the life, says the Lord; no one comes to the Father except through me.',
    korean: '주님이 말씀하신다. 나는 길이요 진리요 생명이다. 나를 통하지 않고서는 아무도 아버지께 갈 수 없다.',
    sourceStatus: 'mock',
    note: 'Sample verse from John 14:6. Replace with the daily Gospel verse.',
  },

  // ── Gospel ────────────────────────────────────────────────────────────────

  {
    id: 'low-gospel-3',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'Gospel',
    subsectionKo: '복음',
    speaker: 'deacon',
    iconType: 'cross',
    order: 38,
    english: 'A reading from the holy Gospel according to John.',
    korean: '요한 복음입니다.',
    sourceStatus: 'mock',
    note: 'Gospel book citation — varies daily.',
  },

  // ── Homily placeholder ────────────────────────────────────────────────────

  {
    id: 'low-homily-1',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'Homily',
    subsectionKo: '강론',
    speaker: 'priest',
    iconType: 'placeholder',
    order: 43,
    placeholder: true,
    english: '[ Homily — given by the priest or deacon. Variable each Mass. ]',
    korean: '[ 강론 — 사제 또는 부제가 합니다. 매 미사마다 다릅니다. ]',
    sourceStatus: 'mock',
    note: 'Placeholder only. The homily is always variable and is never pre-published.',
  },

  // ── Universal Prayer — introduction and intentions ────────────────────────

  {
    id: 'low-up-1',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'Universal Prayer',
    subsectionKo: '신자들의 기도',
    speaker: 'priest',
    iconType: 'cross',
    order: 51,
    english: 'Brothers and sisters, as we come to the end of the Liturgy of the Word, let us call upon the Lord for the needs of all people.',
    korean: '형제자매 여러분, 말씀 전례를 마치면서 모든 사람의 필요를 위하여 주님께 기도합시다.',
    sourceStatus: 'mock',
    note: 'Introduction — varies each Mass.',
  },
  {
    id: 'low-up-2',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'Universal Prayer',
    subsectionKo: '신자들의 기도',
    speaker: 'reader',
    iconType: 'neutral',
    order: 52,
    english: 'For the Church throughout the world, that she may be a sign of unity and an instrument of peace, we pray to the Lord.',
    korean: '온 세상의 교회가 일치의 표징과 평화의 도구가 되도록 주님께 기도합시다.',
    sourceStatus: 'mock',
  },
  {
    id: 'low-up-4',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'Universal Prayer',
    subsectionKo: '신자들의 기도',
    speaker: 'reader',
    iconType: 'neutral',
    order: 54,
    english: "For those who are sick, suffering, or facing hardship, that they may know the comfort of God's presence, we pray to the Lord.",
    korean: '아프고 고통받는 이들, 어려움을 겪는 이들이 하느님의 위로를 경험하도록 주님께 기도합시다.',
    sourceStatus: 'mock',
  },
  {
    id: 'low-up-6',
    contentCategory: 'daily',
    section: 'liturgy-of-the-word',
    subsection: 'Universal Prayer',
    subsectionKo: '신자들의 기도',
    speaker: 'priest',
    iconType: 'cross',
    order: 56,
    english: 'Almighty God, you hear the prayer of those who trust in you. Receive these petitions, and grant what is for our good and your glory. We ask this through Christ our Lord.',
    korean: '전능하신 하느님, 당신을 신뢰하는 이들의 기도를 들으시는 분이여, 이 간청을 받아들이시고 저희에게 유익하고 당신 영광에 부합하는 것을 베풀어 주소서. 우리 주 그리스도를 통하여 비나이다.',
    sourceStatus: 'mock',
    note: 'Closing prayer — varies by Mass.',
  },

  // ── Offertory Chant ───────────────────────────────────────────────────────

  {
    id: 'loe-gifts-1',
    contentCategory: 'daily',
    section: 'liturgy-of-the-eucharist',
    subsection: 'Preparation of the Gifts',
    subsectionKo: '예물 준비',
    speaker: 'choir',
    iconType: 'choir',
    order: 58,
    english: 'An Offertory Chant is sung while the gifts of bread and wine are brought to the altar.',
    korean: '빵과 포도주의 예물을 제단으로 가져오는 동안 봉헌 성가를 부릅니다.',
    sourceStatus: 'mock',
    note: 'Offertory chant or hymn — variable.',
  },

  // ── Prayer over the Offerings ─────────────────────────────────────────────

  {
    id: 'loe-poo-3',
    contentCategory: 'daily',
    section: 'liturgy-of-the-eucharist',
    subsection: 'Prayer over the Offerings',
    subsectionKo: '예물 기도',
    speaker: 'priest',
    iconType: 'cross',
    order: 65,
    english: 'Accept, O Lord, the prayers of your faithful with the sacrificial offerings, that, through these acts of devotedness, we may pass over to the glory of heaven.',
    korean: '주님, 신자들의 기도와 제사 예물을 받아들이시어, 이 신심 행위를 통하여 저희가 하늘 영광으로 옮아가게 하소서.',
    sourceStatus: 'mock',
    note: 'Sample Prayer over the Offerings — varies by Sunday/feast.',
  },

  // ── Communion Chant ───────────────────────────────────────────────────────

  {
    id: 'loe-com-5',
    contentCategory: 'daily',
    section: 'liturgy-of-the-eucharist',
    subsection: 'Communion',
    subsectionKo: '영성체',
    speaker: 'choir',
    iconType: 'choir',
    order: 99,
    english: 'A Communion Chant or hymn is sung during the distribution of Communion.',
    korean: '영성체하는 동안 영성체 성가를 부릅니다.',
    sourceStatus: 'mock',
    note: 'Communion chant or hymn — variable.',
  },

  // ── Prayer after Communion ────────────────────────────────────────────────

  {
    id: 'loe-pac-2',
    contentCategory: 'daily',
    section: 'liturgy-of-the-eucharist',
    subsection: 'Prayer after Communion',
    subsectionKo: '영성체 후 기도',
    speaker: 'priest',
    iconType: 'cross',
    order: 102,
    english: 'We have partaken of the gifts of this sacred mystery, humbly imploring, O Lord, that what your Son commanded us to do in memory of him may bring us growth in charity.',
    korean: '주님, 이 성스러운 신비의 예물에 참여한 저희는 성자께서 당신 기념으로 거행하도록 분부하신 것이 저희 사랑을 키워주기를 겸손히 청하나이다.',
    sourceStatus: 'mock',
    note: 'Sample Prayer after Communion — varies by Sunday/feast.',
  },

  // ── Dismissal formula ─────────────────────────────────────────────────────

  {
    id: 'cr-dismissal-1',
    contentCategory: 'daily',
    section: 'concluding-rites',
    subsection: 'Dismissal',
    subsectionKo: '파견',
    speaker: 'deacon',
    iconType: 'cross',
    order: 113,
    english: 'Go forth, the Mass is ended.',
    korean: '미사가 끝났으니 가서 복음을 전합시다.',
    sourceStatus: 'mock',
    note: 'One of four dismissal formulas. Others: "Go and announce the Gospel of the Lord," "Go in peace, glorifying the Lord by your life," "Go in peace."',
  },

  // ── Closing Hymn ──────────────────────────────────────────────────────────

  {
    id: 'cr-hymn-1',
    contentCategory: 'daily',
    section: 'concluding-rites',
    subsection: 'Closing Hymn',
    subsectionKo: '파견 성가',
    speaker: 'choir',
    iconType: 'placeholder',
    order: 110,
    placeholder: true,
    english: '[ Closing Hymn — selected by the music director. Variable each Mass. ]',
    korean: '[ 파견 성가 — 음악 담당자가 선택합니다. 매 미사마다 다릅니다. ]',
    sourceStatus: 'mock',
    note: 'Placeholder only. Hymn text is subject to separate copyright.',
  },
]
