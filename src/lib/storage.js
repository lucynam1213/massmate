/**
 * Storage abstraction — Capacitor-compatible localStorage wrapper.
 *
 * All key/value reads and writes go through this module.
 * Centralises the storage prefix and error handling so that callers
 * don't touch localStorage directly.
 *
 * ─── Migrating to @capacitor/preferences ───────────────────────────────────
 * When building the native app, swap the implementation below for:
 *
 *   import { Preferences } from '@capacitor/preferences'
 *
 *   export const Storage = {
 *     get:    (key) => Preferences.get({ key }),        // → { value: string | null }
 *     set:    (key, value) => Preferences.set({ key, value }),
 *     remove: (key) => Preferences.remove({ key }),
 *   }
 *
 * Callers use getJSON / setJSON which wrap the raw string value.
 * Note: Preferences methods are async — update callers that do sync init reads.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const PREFIX = 'mm_'

function prefixed(key) { return PREFIX + key }

export const Storage = {
  get(key) {
    try { return localStorage.getItem(prefixed(key)) }
    catch { return null }
  },

  set(key, value) {
    try { localStorage.setItem(prefixed(key), String(value)) }
    catch { /* storage quota exceeded — silent fail */ }
  },

  remove(key) {
    try { localStorage.removeItem(prefixed(key)) }
    catch { }
  },

  /** Read a JSON-encoded value. Returns `fallback` on any error. */
  getJSON(key, fallback = null) {
    try {
      const raw = this.get(key)
      return raw !== null ? JSON.parse(raw) : fallback
    } catch {
      return fallback
    }
  },

  /** Write a value as JSON. */
  setJSON(key, value) {
    this.set(key, JSON.stringify(value))
  },
}
