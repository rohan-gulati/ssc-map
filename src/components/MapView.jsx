import { MapContainer, TileLayer, CircleMarker, Polygon, Tooltip } from 'react-leaflet'
import { radiusForArea, colorForTier } from '../siteStyle'
import { CIVILIZATION_EXTENT } from '../data/extent'

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
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &mdash; site data: ASI, Possehl, Kenoyer, Shinde et al.'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

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
        return (
          <CircleMarker
            key={site.id}
            center={[site.lat, site.lng]}
            radius={baseRadius}
            pathOptions={{
              color: isSelected ? '#1b1b1b' : '#5c3a26',
              weight: isSelected ? 3 : 1,
              fillColor: colorForTier(site.tier),
              fillOpacity: 0.85,
            }}
            eventHandlers={{
              click: () => onSelect(site.id),
            }}
          >
            <Tooltip direction="top" offset={[0, -baseRadius]} opacity={1}>
              <span className="map-tooltip-name">{site.name}</span>
              <span className="map-tooltip-area">{site.areaHectares} ha</span>
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
