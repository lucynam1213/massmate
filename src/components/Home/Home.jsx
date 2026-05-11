import { useNavigate } from 'react-router-dom'
import './Home.css'

const WEEKDAY = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
const FULLDATE = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
const today = new Date()

function LiturgyStrip({ liturgy, loading }) {
  if (loading) {
    return (
      <div className="liturgy-strip liturgy-strip--loading">
        <div className="liturgy-strip__shimmer" />
        <div className="liturgy-strip__shimmer liturgy-strip__shimmer--short" />
      </div>
    )
  }

  if (!liturgy) return null

  return (
    <div className="liturgy-strip">
      <div className="liturgy-strip__eyebrow">
        <span className="liturgy-strip__dot" aria-hidden="true" />
        <span className="liturgy-strip__label">Today's Liturgy</span>
      </div>

      {liturgy.title ? (
        <p className="liturgy-strip__title">{liturgy.title}</p>
      ) : (
        <p className="liturgy-strip__title liturgy-strip__title--plain">
          {liturgy.weekLabel ?? liturgy.season}
        </p>
      )}

      <div className="liturgy-strip__meta">
        {liturgy.weekLabel && liturgy.title && (
          <span className="liturgy-strip__week">{liturgy.weekLabel}</span>
        )}
        {liturgy.season && (
          <span className="liturgy-strip__season">{liturgy.season}</span>
        )}
        {!liturgy.isWeekday && liturgy.rank && (
          <span className="liturgy-strip__rank">{liturgy.rank}</span>
        )}
      </div>
    </div>
  )
}

export default function Home({ massInfo, settings, liturgy }) {
  const navigate = useNavigate()
  const { sections } = massInfo

  const primaryLabel   = settings.primaryLang   === 'english' ? 'English' : '한국어'
  const secondaryLabel = settings.secondaryLang  === 'korean'  ? '한국어'  : 'English'

  return (
    <div className="home">
      <header className="home__header">
        <p className="home__weekday">{WEEKDAY.format(today)}</p>
        <h1 className="home__title">Mass Mate</h1>
        <p className="home__subtitle">Follow the Mass with ease</p>
      </header>

      <LiturgyStrip liturgy={liturgy} loading={!liturgy} />

      <section className="home__mass">
        <p className="home__mass-eyebrow">Today's Mass</p>
        <h2 className="home__mass-title">{massInfo.title}</h2>
        <p className="home__mass-rite">{massInfo.rite}</p>
        <p className="home__mass-date">{FULLDATE.format(today)}</p>

        <div className="home__lang-pair">
          <span className="home__lang-chip home__lang-chip--primary">{primaryLabel}</span>
          <span className="home__lang-arrow">↔</span>
          <span className="home__lang-chip home__lang-chip--secondary">{secondaryLabel}</span>
        </div>

        <button className="home__cta" onClick={() => navigate('/mass')}>
          Begin Mass
        </button>
      </section>

      <section className="home__sections">
        <h3 className="home__sections-label">Jump to section</h3>
        <ul className="home__sections-list">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className="home__section-btn"
                onClick={() => navigate(`/mass/${section.id}`)}
              >
                <span className="home__section-dot" aria-hidden="true" />
                <span className="home__section-name">{section.label}</span>
                <span className="home__section-name-ko">{section.labelKo}</span>
                <span className="home__section-chevron" aria-hidden="true">›</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
