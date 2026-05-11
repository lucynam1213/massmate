/**
 * Centralized environment configuration.
 *
 * All environment-sensitive values live here. To override for staging or
 * production, use Vite environment variables (VITE_* in .env files).
 *
 * https://vitejs.dev/guide/env-and-mode
 */

export const ENV = {
  /** Liturgical Calendar API base URL */
  LITCAL_API: import.meta.env.VITE_LITCAL_API
    ?? 'https://litcal.johnromanodorazio.com/api/v5',

  /** How long to keep the liturgical calendar response cached (ms) */
  LITCAL_CACHE_TTL_MS: 24 * 60 * 60 * 1000,

  /** Current app version — keep in sync with package.json */
  APP_VERSION: '0.1.0',

  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
}
