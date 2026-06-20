'use client'

import { useEffect } from 'react'

/**
 * Strips the URL hash on every page load/reload so that
 * e.g. http://localhost:3000/#work always resets to http://localhost:3000
 * Uses history.replaceState — no navigation, no flash.
 */
export function HashReset() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, []) // empty deps → runs once on mount (i.e. on every page load)

  return null
}
