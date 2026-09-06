import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TextBlock from '../shared/TextBlock/TextBlock'
import { LEGIO_SECTIONS, MYSTERY_GROUPS, TESSERA_TEXTS } from '../../data/legio/tessera'
import '../MassFlow/MassFlow.css'
import './Legio.css'

const STICKY_NAV_H = 52

function groupBySubsection(texts, sectionId) {
  const filtered = texts
    .filter((t) => t.section === sectionId && !t.mysteryGroup)
    .sort((a, b) => a.order - b.order)
  const map = new Map()
  for (const item of filtered) {
    if (!map.has(item.subsection)) {
      map.set(item.subsection, { name: item.subsection, nameKo: item.subsectionKo, items: [] })
    }
    map.get(item.subsection).items.push(item)
  }
  return [...map.values()]
}

/**
 * Legio — Legion of Mary Tessera (Opening Prayers, Rosary, Catena, Concluding
 * Prayers). Mirrors MassFlow's continuous-scroll / sticky-nav pattern and
 * reuses its CSS + TextBlock so the two feel like the same app. Displayed
 * language pair comes from the same global settings (primaryLang/secondaryLang)
 * used throughout the app.
 */
export default function Legio({ settings, updateSetting }) {
  const { sectionId } = useParams()
  const navigate       = useNavigate()

  const sections = LEGIO_SECTIONS
  const texts    = TESSERA_TEXTS
  const focusMode = settings.focusMode

  const [activeBlockId, setActiveBlockId]     = useState(null)
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id)
  const [selectedMystery, setSelectedMystery] = useState(MYSTERY_GROUPS[0].id)

  const mysteryItems = useMemo(() =>
    texts
      .filter((t) => t.section === 'rosary' && t.mysteryGroup === selectedMystery)
      .sort((a, b) => a.order - b.order),
    [texts, selectedMystery]
  )
  const activeMystery = MYSTERY_GROUPS.find((m) => m.id === selectedMystery)

  const sectionRefs      = useRef({})
  const containerRef     = useRef(null)
  const rafRef           = useRef(null)
  const didInitialScroll = useRef(false)

  const groupedSections = useMemo(() =>
    sections.map((s) => ({ ...s, subsections: groupBySubsection(texts, s.id) })),
    [sections, texts]
  )

  const textSettings = useMemo(() => ({
    primaryLang:   settings.primaryLang,
    secondaryLang: settings.secondaryLang,
    fontSize:      settings.fontSize,
  }), [settings.primaryLang, settings.secondaryLang, settings.fontSize])

  useEffect(() => {
    containerRef.current = document.querySelector('.page-content')
  }, [])

  useEffect(() => {
    const getContainer = () => containerRef.current
    const rafScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        const container = getContainer()
        if (!container) return
        const threshold = container.scrollTop + STICKY_NAV_H + 12
        let current = sections[0].id
        for (const s of sections) {
          const el = sectionRefs.current[s.id]
          if (el && el.offsetTop <= threshold) current = s.id
        }
        setActiveSectionId(current)
      })
    }

    const container = getContainer() ?? document.querySelector('.page-content')
    if (!container) return
    containerRef.current = container
    container.addEventListener('scroll', rafScroll, { passive: true })
    rafScroll()
    return () => {
      container.removeEventListener('scroll', rafScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [sections])

  useEffect(() => {
    if (!sectionId || didInitialScroll.current) return
    const timer = setTimeout(() => {
      scrollToSection(sectionId)
      didInitialScroll.current = true
    }, 80)
    return () => clearTimeout(timer)
  }, [sectionId]) // eslint-disable-line

  const scrollToSection = useCallback((id) => {
    const el        = sectionRefs.current[id]
    const container = containerRef.current
    if (!el || !container) return
    const top = el.offsetTop - STICKY_NAV_H
    container.scrollTo({ top, behavior: 'smooth' })
  }, [])

  const handleBlockTap = useCallback((id) => {
    setActiveBlockId((prev) => (prev === id ? null : id))
  }, [])

  const toggleFocus = useCallback(() => {
    updateSetting('focusMode', !focusMode)
  }, [focusMode, updateSetting])

  const activeSection = sections.find((s) => s.id === activeSectionId) ?? sections[0]

  return (
    <div className={`mass-flow${focusMode ? ' mass-flow--focus' : ''}`}>

      <nav className="mass-nav" aria-label="Legio navigation">
        <button
          className="mass-nav__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 1 1 8.5 9 16" />
          </svg>
        </button>

        <div className="mass-nav__tabs">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`mass-nav__tab mass-nav__tab--${section.color}${activeSectionId === section.id ? ' mass-nav__tab--active' : ''}`}
              onClick={() => scrollToSection(section.id)}
              aria-current={activeSectionId === section.id ? 'true' : undefined}
            >
              <span className="mass-nav__tab-dot" />
              <span className="mass-nav__tab-label">{section.labelKo}</span>
            </button>
          ))}
        </div>

        <button
          className={`mass-nav__focus-btn${focusMode ? ' mass-nav__focus-btn--on' : ''}`}
          onClick={toggleFocus}
          aria-pressed={focusMode}
          aria-label={focusMode ? 'Exit Focus Mode' : 'Focus Mode'}
        >
          {focusMode ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="4 14 10 14 10 20" />
              <polyline points="20 10 14 10 14 4" />
              <line x1="10" y1="14" x2="3" y2="21" />
              <line x1="21" y1="3" x2="14" y2="10" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          )}
        </button>
      </nav>

      <div className="mass-flow__section-strip">
        <span className="mass-flow__section-dot" />
        <span className="mass-flow__section-name">{activeSection.label}</span>
        <span className="mass-flow__section-name-ko">{activeSection.labelKo}</span>
      </div>

      <div className="mass-flow__body">
        {groupedSections.map((section) => (
          <section
            key={section.id}
            id={`legio-section-${section.id}`}
            ref={(el) => { sectionRefs.current[section.id] = el }}
            className={`section-block${activeSectionId === section.id ? ' section-block--current' : ''}`}
          >
            <header className="section-block__header">
              <div className="section-block__rule" aria-hidden="true" />
              <h2 className="section-block__title">{section.label}</h2>
              <p className="section-block__title-ko">{section.labelKo}</p>
              <div className="section-block__rule" aria-hidden="true" />
            </header>

            {section.id === 'rosary' && (
              <div className="subsection mystery-picker">
                <div className="mystery-picker__tabs" role="tablist" aria-label="Rosary mysteries">
                  {MYSTERY_GROUPS.map((m) => (
                    <button
                      key={m.id}
                      role="tab"
                      aria-selected={selectedMystery === m.id}
                      className={`mystery-picker__tab${selectedMystery === m.id ? ' mystery-picker__tab--active' : ''}`}
                      onClick={() => setSelectedMystery(m.id)}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
                <div className="subsection__header">
                  <p className="subsection__name">{activeMystery.label} Mysteries</p>
                  <p className="subsection__name-ko">{activeMystery.labelKo}의 신비 — {activeMystery.daysKo}</p>
                </div>
                <div className="subsection__cards">
                  {mysteryItems.map((item) => (
                    <TextBlock
                      key={item.id}
                      item={item}
                      settings={textSettings}
                      isActive={activeBlockId === item.id}
                      onTap={handleBlockTap}
                    />
                  ))}
                </div>
              </div>
            )}

            {section.subsections.map((sub) => (
              <div key={sub.name} className="subsection">
                <div className="subsection__header">
                  <p className="subsection__name">{sub.name}</p>
                  <p className="subsection__name-ko">{sub.nameKo}</p>
                </div>
                <div className="subsection__cards">
                  {sub.items.map((item) => (
                    <TextBlock
                      key={item.id}
                      item={item}
                      settings={textSettings}
                      isActive={activeBlockId === item.id}
                      onTap={handleBlockTap}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}

        <div className="mass-end" aria-hidden="true">
          <span className="mass-end__cross">✝</span>
          <p className="mass-end__text">Tessera Complete</p>
          <p className="mass-end__text-ko">뗏세라를 마칩니다</p>
        </div>
      </div>

    </div>
  )
}
