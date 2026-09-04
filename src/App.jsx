import { Routes, Route, Navigate } from 'react-router-dom'
import { useSettings } from './hooks/useSettings'
import { useMassData } from './hooks/useMassData'
import { useLiturgy } from './hooks/useLiturgy'
import Home from './components/Home/Home'
import MassFlow from './components/MassFlow/MassFlow'
import Legio from './components/Legio/Legio'
import Settings from './components/Settings/Settings'
import BottomNav from './components/shared/BottomNav/BottomNav'
import './styles/global.css'

const SEASON_COLORS = {
  green:  ['#3A6B48', 'rgba(58, 107, 72, 0.07)'],
  white:  ['#8A7040', 'rgba(138, 112, 64, 0.07)'],
  gold:   ['#8A7040', 'rgba(138, 112, 64, 0.07)'],
  red:    ['#8B2929', 'rgba(139, 41, 41, 0.07)'],
  purple: ['#5E3A8A', 'rgba(94, 58, 138, 0.07)'],
  rose:   ['#8A3F62', 'rgba(138, 63, 98, 0.07)'],
  black:  ['#2A2A2A', 'rgba(42, 42, 42, 0.07)'],
}

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <span className="loading-screen__cross">✝</span>
      <p className="loading-screen__text">Loading Mass…</p>
    </div>
  )
}

function ErrorScreen({ message }) {
  return (
    <div className="loading-screen">
      <p className="loading-screen__text">Unable to load Mass data.</p>
      <p className="loading-screen__sub">{message}</p>
    </div>
  )
}

export default function App() {
  const { settings, updateSetting } = useSettings()
  const { massInfo, loading, error } = useMassData()
  const { liturgy } = useLiturgy()

  const [seasonColor, seasonFaint] = SEASON_COLORS[liturgy?.colorRaw] ?? SEASON_COLORS.green

  const rootClass = 'app-shell'
  const seasonStyle = {
    '--color-season':       seasonColor,
    '--color-season-faint': seasonFaint,
  }

  if (loading) return <div className={rootClass} style={seasonStyle}><LoadingScreen /></div>
  if (error)   return <div className={rootClass} style={seasonStyle}><ErrorScreen message={error.message} /></div>

  return (
    <div className={rootClass} style={seasonStyle}>
      <div className="app-shell__season-stripe" />
      <div className="page-content">
        <Routes>
          <Route
            path="/"
            element={<Home massInfo={massInfo} settings={settings} liturgy={liturgy} />}
          />
          <Route
            path="/mass/:sectionId?"
            element={
              <MassFlow
                massInfo={massInfo}
                settings={settings}
                updateSetting={updateSetting}
              />
            }
          />
          <Route
            path="/legio/:sectionId?"
            element={<Legio settings={settings} updateSetting={updateSetting} />}
          />
          <Route
            path="/settings"
            element={<Settings settings={settings} onUpdate={updateSetting} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  )
}
