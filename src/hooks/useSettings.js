import { useState, useEffect } from 'react'
import { Storage } from '../lib/storage'

const STORAGE_KEY = 'settings'

const DEFAULTS = {
  primaryLang:   'english',
  secondaryLang: 'korean',
  fontSize:      'medium',
  focusMode:     false,
}

function readSettings() {
  const saved = Storage.getJSON(STORAGE_KEY)
  return saved ? { ...DEFAULTS, ...saved } : DEFAULTS
}

export function useSettings() {
  const [settings, setSettings] = useState(readSettings)

  useEffect(() => {
    Storage.setJSON(STORAGE_KEY, settings)
  }, [settings])

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return { settings, updateSetting }
}
