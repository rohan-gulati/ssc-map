import { useMemo, useState } from 'react'
import MapView from './components/MapView'
import SiteDetailPanel from './components/SiteDetailPanel'
import Legend from './components/Legend'
import rawSites from './data/sites.json'
import { TIER_ORDER } from './siteStyle'
import './App.css'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)
  const [legendOpen, setLegendOpen] = useState(true)

  // Render larger / higher-tier sites last so they paint on top, and so the
  // biggest cities are never hidden under a smaller neighbour.
  const sites = useMemo(
    () =>
      [...rawSites].sort(
        (a, b) =>
          TIER_ORDER[b.tier] - TIER_ORDER[a.tier] ||
          a.areaHectares - b.areaHectares,
      ),
    [],
  )

  const selectedSite = useMemo(
    () => sites.find((s) => s.id === selectedId) || null,
    [sites, selectedId],
  )

  const largest = useMemo(
    () => [...rawSites].sort((a, b) => b.areaHectares - a.areaHectares)[0],
    [],
  )

  const indiaCount = useMemo(
    () => rawSites.filter((s) => s.country === 'India').length,
    [],
  )

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-text">
          <h1>The Sindhu–Saraswati Civilization</h1>
          <p className="subtitle">
            {indiaCount} of {rawSites.length} mapped sites lie in modern India —
            including the largest of them all, {largest.name}, and the densest
            Mature-Harappan cluster along the Ghaggar-Hakra (Saraswati) basin.
            The civilization was far more than Mohenjo-daro and Harappa.
          </p>
        </div>
        <button
          className="legend-toggle"
          onClick={() => setLegendOpen((v) => !v)}
        >
          {legendOpen ? 'Hide legend' : 'Show legend'}
        </button>
      </header>

      <main className="app-main">
        <MapView sites={sites} selectedId={selectedId} onSelect={setSelectedId} />
        {legendOpen && <Legend />}
        <SiteDetailPanel site={selectedSite} onClose={() => setSelectedId(null)} />
      </main>
    </div>
  )
}
