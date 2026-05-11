import { memo, useCallback } from 'react'
import './TextBlock.css'

/**
 * SpeakerIcon renders the liturgical speaker symbol.
 *
 * iconType → meaning:
 *   cross       — priest or deacon speaking
 *   fishEye     — people's response
 *   combined    — priest and people speaking together
 *   choir       — choir / cantor
 *   neutral     — reader or narrator (rubric / instruction)
 *   placeholder — variable slot (homily, hymns, etc.)
 */
const SpeakerIcon = memo(function SpeakerIcon({ iconType }) {
  if (iconType === 'cross') {
    return (
      <svg className="text-block__icon text-block__icon--priest" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <line x1="8" y1="1.5" x2="8" y2="14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="3.5" y1="5.5" x2="12.5" y2="5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (iconType === 'combined') {
    return (
      <svg className="text-block__icon text-block__icon--all" width="22" height="14" viewBox="0 0 28 14" aria-hidden="true">
        <line x1="6" y1="1" x2="6" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="2" y1="4.5" x2="10" y2="4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="20" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="20" cy="7" r="2" fill="currentColor" />
      </svg>
    )
  }
  if (iconType === 'fishEye') {
    return (
      <svg className="text-block__icon text-block__icon--people" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="8" cy="8" r="2.2" fill="currentColor" />
      </svg>
    )
  }
  if (iconType === 'choir') {
    return (
      <svg className="text-block__icon text-block__icon--cantor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <ellipse cx="4.5" cy="12" rx="2.5" ry="1.8" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <line x1="7" y1="12" x2="7" y2="3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="7" y1="3" x2="13" y2="4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="13" y1="4.5" x2="13" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (iconType === 'placeholder') {
    return (
      <svg className="text-block__icon text-block__icon--placeholder" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 2.5" />
      </svg>
    )
  }
  return (
    <svg className="text-block__icon text-block__icon--reader" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <line x1="2" y1="4.5" x2="14" y2="4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="2" y1="8" x2="11.5" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="2" y1="11.5" x2="9" y2="11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
})

/**
 * TextBlock — a single liturgical text unit.
 *
 * Wrapped in React.memo: only re-renders when isActive, settings, or onTap change.
 * Receives `onTap` as a stable callback (not an arrow function) so memo is effective.
 */
const TextBlock = memo(function TextBlock({ item, settings, isActive, onTap }) {
  const primaryLang   = settings.primaryLang
  const secondaryLang = settings.secondaryLang

  const primaryText   = primaryLang   === 'english' ? item.english : item.korean
  const secondaryText = secondaryLang === 'korean'  ? item.korean  : item.english

  const displayText = isActive ? secondaryText : primaryText
  const displayLang = isActive
    ? (secondaryLang === 'korean' ? 'KO' : 'EN')
    : (primaryLang   === 'english' ? 'EN' : 'KO')

  const iconType = item.iconType ?? deriveIconType(item.speaker ?? item.role)
  const isPlaceholder = item.placeholder === true
  const isNarrator = item.speaker === 'narrator'

  // Stable handler — onTap is already a useCallback from MassFlow
  const handleClick = useCallback(() => { onTap(item.id) }, [onTap, item.id])

  if (isPlaceholder) {
    return (
      <div className="text-block text-block--placeholder">
        <SpeakerIcon iconType="placeholder" />
        <p className="text-block__placeholder-text">{primaryText || item.english}</p>
      </div>
    )
  }

  if (isNarrator) {
    return (
      <div
        className={`text-block text-block--narrator text-block--font-${settings.fontSize}`}
        role="note"
      >
        <SpeakerIcon iconType={iconType} />
        <div className="text-block__body">
          <p className="text-block__text">{primaryText}</p>
        </div>
      </div>
    )
  }

  return (
    <button
      className={`text-block text-block--font-${settings.fontSize}${isActive ? ' text-block--active' : ''}`}
      onClick={handleClick}
      aria-pressed={isActive}
    >
      <SpeakerIcon iconType={iconType} />
      <div className="text-block__body">
        <span className={`text-block__lang${isActive ? ' text-block__lang--on' : ''}`}>
          {displayLang}
        </span>
        <p className="text-block__text">{displayText}</p>
        {item.contentCategory === 'daily' && (
          <span className="text-block__daily-dot" title="Varies daily" />
        )}
      </div>
    </button>
  )
})

export default TextBlock

/** Maps legacy speaker/role values to iconType for backward compatibility. */
function deriveIconType(speaker) {
  switch (speaker) {
    case 'priest':
    case 'deacon':   return 'cross'
    case 'people':   return 'fishEye'
    case 'all':      return 'combined'
    case 'cantor':
    case 'choir':    return 'choir'
    default:         return 'neutral'
  }
}
