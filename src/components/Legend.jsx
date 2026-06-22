import { TIER_COLORS, TIER_LABELS, CULTURE_STYLES } from '../siteStyle'

export default function Legend() {
  return (
    <div className="legend">
      <div className="legend-title">Legend</div>

      <div className="legend-group">
        <div className="legend-group-title">Marker colour — tier</div>
        {Object.keys(TIER_LABELS).map((tier) => (
          <div className="legend-row" key={tier}>
            <span
              className="legend-swatch"
              style={{ backgroundColor: TIER_COLORS[tier] }}
            />
            <span>{TIER_LABELS[tier]}</span>
          </div>
        ))}
      </div>

      <div className="legend-group">
        <div className="legend-group-title">Culture</div>
        <div className="legend-row">
          <span
            className="legend-swatch legend-swatch-dashed"
            style={{
              backgroundColor: CULTURE_STYLES['OCP/Transition'].fillColor,
              borderColor: CULTURE_STYLES['OCP/Transition'].color,
            }}
          />
          <span>{CULTURE_STYLES['OCP/Transition'].label}</span>
        </div>
      </div>

      <div className="legend-group">
        <div className="legend-group-title">Marker size — settlement area</div>
        <div className="legend-sizes">
          <span className="legend-dot" style={{ width: 10, height: 10 }} />
          <span className="legend-dot" style={{ width: 18, height: 18 }} />
          <span className="legend-dot" style={{ width: 30, height: 30 }} />
        </div>
        <div className="legend-size-caption">small outpost → large city (Rakhigarhi 550 ha)</div>
      </div>
    </div>
  )
}
