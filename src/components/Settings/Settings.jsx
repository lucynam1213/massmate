import './Settings.css'

const LANG_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'korean',  label: '한국어 (Korean)' },
]

const FONT_SIZES = [
  { value: 'small',  label: 'Small',  sampleClass: 'settings__font-sample--small' },
  { value: 'medium', label: 'Medium', sampleClass: 'settings__font-sample--medium' },
  { value: 'large',  label: 'Large',  sampleClass: 'settings__font-sample--large' },
]

function Toggle({ on, onChange, id }) {
  return (
    <button
      id={id}
      className={`settings__toggle${on ? ' settings__toggle--on' : ''}`}
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
    >
      <span className="settings__toggle-thumb" />
    </button>
  )
}

export default function Settings({ settings, onUpdate }) {
  return (
    <div className="settings">
      <header className="settings__header">
        <h1 className="settings__title">Settings</h1>
        <p className="settings__subtitle">Customize your Mass experience</p>
      </header>

      {/* ── Language ── */}
      <section className="settings__group">
        <h2 className="settings__group-title">Language</h2>

        <div className="settings__row">
          <label className="settings__row-info" htmlFor="primary-lang">
            <span className="settings__row-label">Primary Language</span>
            <span className="settings__row-desc">Main text shown during Mass</span>
          </label>
          <select
            id="primary-lang"
            className="settings__select"
            value={settings.primaryLang}
            onChange={(e) => onUpdate('primaryLang', e.target.value)}
          >
            {LANG_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="settings__divider" />

        <div className="settings__row">
          <label className="settings__row-info" htmlFor="secondary-lang">
            <span className="settings__row-label">Secondary Language</span>
            <span className="settings__row-desc">Shown when you tap a block</span>
          </label>
          <select
            id="secondary-lang"
            className="settings__select"
            value={settings.secondaryLang}
            onChange={(e) => onUpdate('secondaryLang', e.target.value)}
          >
            {LANG_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </section>

      {/* ── Reading ── */}
      <section className="settings__group">
        <h2 className="settings__group-title">Reading</h2>

        <div className="settings__font-row">
          {FONT_SIZES.map((size) => (
            <button
              key={size.value}
              className={`settings__font-btn${settings.fontSize === size.value ? ' settings__font-btn--active' : ''}`}
              onClick={() => onUpdate('fontSize', size.value)}
            >
              <span className={`settings__font-sample ${size.sampleClass}`}>Aa</span>
              <span className="settings__font-label">{size.label}</span>
            </button>
          ))}
        </div>

        <div className="settings__preview">
          <p className={`settings__preview-en settings__preview--${settings.fontSize}`}>
            Glory to God in the highest.
          </p>
          <p className={`settings__preview-ko settings__preview--${settings.fontSize}`}>
            하늘 높은 데서는 하느님께 영광.
          </p>
        </div>

        <div className="settings__divider" />

        <div className="settings__row">
          <div className="settings__row-info">
            <span className="settings__row-label">Focus Mode</span>
            <span className="settings__row-desc">Hide section tabs while reading</span>
          </div>
          <Toggle
            on={settings.focusMode}
            onChange={(v) => onUpdate('focusMode', v)}
            id="focus-mode"
          />
        </div>
      </section>

      <p className="settings__version">Mass Mate v0.1 · MVP</p>
    </div>
  )
}
