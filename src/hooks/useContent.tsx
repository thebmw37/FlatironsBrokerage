/**
 * Provider component that loads the full content bundle once and supplies it
 * to every page. Hooks (useContent, usePrimaryBroker) and the context object
 * live in ./contentContext so this file can fast-refresh cleanly.
 */

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { loadContent } from '../lib/contentLoader'
import {
  buildState,
  ContentContext,
  INITIAL_STATE,
  type ContentState,
} from './contentContext'

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentState>(INITIAL_STATE)

  useEffect(() => {
    let cancelled = false
    loadContent()
      .then((bundle) => {
        if (cancelled) return
        setState(buildState(bundle, 'github', false))
      })
      .catch(() => {
        if (cancelled) return
        // Keep the bundled fallback but flip loading off so the UI knows.
        setState((s) => ({ ...s, loading: false }))
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Memo so consumers don't re-render on each ContentProvider render.
  const value = useMemo(() => state, [state])

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  )
}
