import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TextBlock from '../shared/TextBlock/TextBlock'
import './MassFlow.css'

const STICKY_NAV_H = 52

function groupBySubsection(texts, sectionId) {
  const filtered = texts
    .filter((t) => t.section === sectionId)
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

export default function MassFlow({ massInfo, settings, updateSetting }) {
  const { sectionId } = useParams()
  const navigate      = useNavigate()

  const { sections, texts } = massInfo
  const focusMode = settings.focusMode

  const [activeBlockId, setActiveBlockId]     = useState(null)
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id)

  const sectionRefs      = useRef({})
  const containerRef     = useRef(null)
  const rafRef           = useRef(null)
  const didInitialScroll = useRef(false)

  // Pre-group all sections — only recomputes when texts/sections change
  const groupedSections = useMemo(() =>
    sections.map((s) => ({ ...s, subsections: groupBySubsection(texts, s.id) })),
    [sections, texts]
  )

  // Isolate the settings that TextBlock actually needs.
  // Prevents focusMode changes from re-rendering all 100+ blocks.
  const textSettings = useMemo(() => ({
    primaryLang:   settings.primaryLang,
    secondaryLang: settings.secondaryLang,
    fontSize:      settings.fontSize,
  }), [settings.primaryLang, settings.secondaryLang, settings.fontSize])

  // Cache the .page-content container once — avoids querySelector on every scroll
  useEffect(() => {
    containerRef.current = document.querySelector('.page-content')
  }, [])

  // Scroll listener — rAF-based to avoid forced layout / reflow on every frame.
  // Uses offsetTop (layout-stable) instead of getBoundingClientRect().
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

  // Initial scroll to section from URL param
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

  // Stable tap handler — passed directly (not wrapped in arrow) so React.memo works
  const handleBlockTap = useCallback((id) => {
    setActiveBlockId((prev) => (prev === id ? null : id))
  }, [])

  const toggleFocus = useCallback(() => {
    updateSetting('focusMode', !focusMode)
  }, [focusMode, updateSetting])

  const activeSection = sections.find((s) => s.id === activeSectionId) ?? sections[0]

  return (
    <div className={`mass-flow${focusMode ? ' mass-flow--focus' : ''}`}>

      {/* ── Sticky mini-nav ── */}
      <nav className="mass-nav" aria-label="Mass navigation">
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

      {/* ── Section title strip ── */}
      <div className="mass-flow__section-strip">
        <span className="mass-flow__section-dot" />
        <span className="mass-flow__section-name">{activeSection.label}</span>
        <span className="mass-flow__section-name-ko">{activeSection.labelKo}</span>
      </div>

      {/* ── All sections — continuous reading scroll ── */}
      <div className="mass-flow__body">
        {groupedSections.map((section) => (
          <section
            key={section.id}
            id={`section-${section.id}`}
            ref={(el) => { sectionRefs.current[section.id] = el }}
            className={`section-block${activeSectionId === section.id ? ' section-block--current' : ''}`}
          >
            <header className="section-block__header">
              <div className="section-block__rule" aria-hidden="true" />
              <h2 className="section-block__title">{section.label}</h2>
              <p className="section-block__title-ko">{section.labelKo}</p>
              <div className="section-block__rule" aria-hidden="true" />
            </header>

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
          <p className="mass-end__text">End of Mass</p>
          <p className="mass-end__text-ko">미사가 끝났습니다</p>
        </div>
      </div>

    </div>
  )
}
