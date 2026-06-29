/**
 * Property types and labels.
 *
 * Property data itself now lives in the GitHub content repo as .txt files
 * under content/Listings/{Active,UnderContract,Sold}/ — see content/README.md.
 * Pages should call `useContent()` to get the current list, instead of
 * importing arrays from here.
 */

export type { Property, PropertyStatus } from '../lib/contentViews'
export { STATUS_LABEL } from '../lib/contentViews'
