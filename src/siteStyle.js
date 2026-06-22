// Shared visual encoding for sites: color by tier, radius by area.
// Earthy palette referencing Harappan terracotta / pottery / seal-stone.

export const TIER_COLORS = {
  major: '#b5532a', // saturated terracotta
  secondary: '#cf9b5a', // ochre / sand
  outpost: '#d9c6a3', // pale clay
}

export const TIER_LABELS = {
  major: 'Major urban centre',
  secondary: 'Secondary town',
  outpost: 'Frontier outpost / colony',
}

export const TIER_ORDER = { major: 0, secondary: 1, outpost: 2 }

// Marker radius (in pixels) from site area. A square-root scale keeps the
// huge sites (Rakhigarhi 550 ha, Mohenjo-daro 300 ha) visually dominant
// without letting them swamp the map, while tiny outposts stay legible.
export function radiusForArea(areaHectares) {
  const MIN = 5
  const SCALE = 1.15
  return MIN + SCALE * Math.sqrt(areaHectares || 1)
}

export function colorForTier(tier) {
  return TIER_COLORS[tier] || TIER_COLORS.outpost
}
