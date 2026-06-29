/**
 * Context + non-component exports for the content system. Split out from
 * useContent.tsx so the Vite/React Refresh plugin can fast-refresh that
 * file (which now only exports the provider component).
 */

import { createContext, useContext } from 'react'
import {
  loadBundledContent,
  type ContentBundle,
} from '../lib/contentLoader'
import {
  toBlogPosts,
  toBrokers,
  toFeatured,
  toProperties,
  toTestimonials,
  type BlogPost,
  type Broker,
  type FeaturedProperty,
  type Property,
  type Testimonial,
} from '../lib/contentViews'

export type ContentState = {
  loading: boolean
  source: 'bundled' | 'github'
  brokers: Broker[]
  blog: BlogPost[]
  active: Property[]
  underContract: Property[]
  sold: Property[]
  testimonials: Testimonial[]
  featured: FeaturedProperty | null
}

export function buildState(
  bundle: ContentBundle,
  source: 'bundled' | 'github',
  loading: boolean,
): ContentState {
  return {
    loading,
    source,
    brokers: toBrokers(bundle.brokers),
    blog: toBlogPosts(bundle.blog),
    active: toProperties(bundle.active, 'active'),
    underContract: toProperties(bundle.underContract, 'under-contract'),
    sold: toProperties(bundle.sold, 'sold'),
    testimonials: toTestimonials(bundle.testimonials),
    featured: toFeatured(bundle.featured),
  }
}

export const INITIAL_STATE: ContentState = buildState(
  loadBundledContent(),
  'bundled',
  true,
)

export const ContentContext = createContext<ContentState>(INITIAL_STATE)

export function useContent(): ContentState {
  return useContext(ContentContext)
}

export function usePrimaryBroker(): Broker | null {
  const { brokers } = useContent()
  return brokers[0] ?? null
}
