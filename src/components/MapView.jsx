import { MapContainer, TileLayer, CircleMarker, Polygon, Tooltip, GeoJSON } from 'react-leaflet'
import { radiusForArea, colorForTier, countryWithFlag, CULTURE_STYLES, isTransitionCulture } from '../siteStyle'
import { CIVILIZATION_EXTENT } from '../data/extent'
import indiaBoundary from '../data/indiaBoundary.json'

// India's official national boundary (Survey-of-India aligned): Jammu &
// Kashmir incl. Aksai Chin, and Arunachal Pradesh, are shown as part of
// India. Drawn as a saffron outline so the map asserts this regardless of
// the basemap's depiction. Source: DataMeet maps, simplified.
const INDIA_BOUNDARY_STYLE = {
  color: '#d97706',
  weight: 2,
  opacity: 0.9,
  fill: false,
}

// Centre roughly on the Saraswati / Indus heartland so both the Sindh cities
// and the Haryana sites are comfortably in frame on first load.
const INITIAL_CENTER = [28.0, 70.5]
const INITIAL_ZOOM = 6

export default function MapView({ sites, selectedId, onSelect }) {
  return (
    <MapContainer
      center={INITIAL_CENTER}
      zoom={INITIAL_ZOOM}
      minZoom={4}
      maxZoom={12}
      className="map-container"
      scrollWheelZoom={true}
      worldCopyJump={true}
    >
      {/* Base tiles WITHOUT labels/admin lines, so the basemap does not draw
          contradicting (internationally-conventional) disputed boundaries. */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; CARTO &mdash; boundary: Survey of India (via DataMeet) &mdash; site data: ASI, Possehl, Kenoyer, Shinde et al.'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />

      {/* India's official boundary (J&K, Aksai Chin and Arunachal as Indian). */}
      <GeoJSON data={indiaBoundary} style={INDIA_BOUNDARY_STYLE} interactive={false} />

      {/* Place-name labels reinstated on top, without the admin lines. */}
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />

      {/* Translucent hull conveying the overall civilization extent. */}
      <Polygon
        positions={CIVILIZATION_EXTENT}
        pathOptions={{
          color: '#8a4a2f',
          weight: 1.5,
          opacity: 0.5,
          fillColor: '#c97e4f',
          fillOpacity: 0.12,
          dashArray: '6 6',
        }}
        interactive={false}
      />

      {sites.map((site) => {
        const isSelected = site.id === selectedId
        const baseRadius = radiusForArea(site.areaHectares)
        const transition = isTransitionCulture(site.culture)
        const transitionStyle = transition ? CULTURE_STYLES['OCP/Transition'] : null
        return (
          <CircleMarker
            key={site.id}
            center={[site.lat, site.lng]}
            radius={baseRadius}
            pathOptions={{
              color: isSelected ? '#1b1b1b' : transitionStyle ? transitionStyle.color : '#5c3a26',
              weight: isSelected ? 3 : 1,
              fillColor: transitionStyle ? transitionStyle.fillColor : colorForTier(site.tier),
              fillOpacity: 0.85,
              dashArray: transitionStyle ? transitionStyle.dashArray : undefined,
            }}
            eventHandlers={{
              click: () => onSelect(site.id),
            }}
          >
            <Tooltip direction="top" offset={[0, -baseRadius]} opacity={1}>
              <span className="map-tooltip-name">{site.name}</span>
              <span className="map-tooltip-area">{site.areaHectares} ha</span>
              <span className="map-tooltip-country">{countryWithFlag(site.country)}</span>
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
