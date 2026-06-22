import { TIER_LABELS, colorForTier, countryWithFlag, CULTURE_STYLES, isTransitionCulture } from '../siteStyle'

export default function SiteDetailPanel({ site, onClose }) {
  return (
    <aside className={`detail-panel ${site ? 'open' : ''}`} aria-hidden={!site}>
      {site && (
        <div className="detail-inner">
          <button className="detail-close" onClick={onClose} aria-label="Close details">
            ×
          </button>

          <span
            className="detail-tier"
            style={{ backgroundColor: colorForTier(site.tier) }}
          >
            {TIER_LABELS[site.tier] || site.tier}
          </span>
          {isTransitionCulture(site.culture) && (
            <span
              className="detail-tier detail-culture"
              style={{ backgroundColor: CULTURE_STYLES['OCP/Transition'].color }}
            >
              {CULTURE_STYLES['OCP/Transition'].label}
            </span>
          )}

          <h2 className="detail-name">{site.name}</h2>
          <p className="detail-location">{site.modernLocation}</p>

          <div className="detail-stats">
            <div className="stat">
              <span className="stat-value">{site.areaHectares} ha</span>
              <span className="stat-label">Approx. area</span>
            </div>
            <div className="stat">
              <span className="stat-value">{countryWithFlag(site.country)}</span>
              <span className="stat-label">Present-day country</span>
            </div>
            <div className="stat stat-wide">
              <span className="stat-value">{site.period}</span>
              <span className="stat-label">Occupation</span>
            </div>
          </div>

          <section className="detail-section">
            <h3>Why it matters</h3>
            <p>{site.significance}</p>
          </section>

          <section className="detail-section">
            <h3>Excavation</h3>
            <p>{site.excavationNotes}</p>
          </section>

          <section className="detail-section detail-sources">
            <h3>Sources</h3>
            <ul>
              {site.sources.map((src, i) => (
                <li key={i}>{src}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </aside>
  )
}
