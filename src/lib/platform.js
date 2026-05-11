/**
 * Platform detection utilities.
 *
 * Safe to call in any environment — never throws.
 * Values reflect the runtime context at module load time.
 */

const cap = typeof window !== 'undefined' ? window.Capacitor : undefined

/** True when running inside a Capacitor native wrapper (iOS or Android) */
export const isCapacitor = Boolean(cap?.isNative)

/** Current Capacitor platform: 'ios' | 'android' | 'web' */
export const capacitorPlatform = cap?.getPlatform?.() ?? 'web'

export const isIOS     = capacitorPlatform === 'ios'
export const isAndroid = capacitorPlatform === 'android'
export const isWeb     = !isCapacitor

/**
 * Whether the device supports `backdrop-filter`.
 * Capacitor WebView on Android pre-Chrome 76 may not support it.
 */
export const supportsBackdropFilter = (() => {
  if (typeof CSS === 'undefined') return false
  return CSS.supports('backdrop-filter', 'blur(1px)')
    || CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
})()
