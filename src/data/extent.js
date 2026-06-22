// An approximate hull of the maximum extent of the Sindhu-Saraswati
// (Indus / Harappan) civilization, used as a translucent background overlay
// to convey the sheer geographic spread before any marker is clicked.
//
// This is a deliberately smoothed, illustrative boundary (NOT a precise
// archaeological isopleth). It is drawn to envelope the known site
// distribution — from the Makran coast and the Oxus colony of Shortugai in
// the northwest, across Sindh, Punjab and the Ghaggar-Hakra (Saraswati)
// basin, down into Kutch and Saurashtra, and east to the upper Ganga-Yamuna
// doab — based on the site distributions mapped in Possehl (2002) and
// Kenoyer (1998).
//
// Coordinates are [lat, lng] pairs (Leaflet ordering), traced clockwise.
export const CIVILIZATION_EXTENT = [
  [37.4, 69.6], // Shortugai outlier (Oxus / Badakhshan), northwest tip
  [33.6, 73.2], // northern Punjab / Potohar foothills
  [32.9, 74.8], // Manda (Jammu) — northern frontier
  [30.2, 77.8], // upper Ganga-Yamuna doab edge
  [29.0, 77.7], // Alamgirpur — eastern frontier
  [27.5, 76.4], // eastern Rajasthan margin
  [24.0, 73.0], // Aravalli / southeast margin
  [21.6, 70.2], // Saurashtra (Rojdi) — southern reach
  [22.4, 69.0], // Kutch / Gulf coast
  [24.0, 66.6], // Indus delta / Arabian Sea coast (Sindh)
  [25.2, 62.0], // Sutkagan Dor — Makran coast, western frontier
  [27.4, 62.6], // Balochistan highlands (west)
  [29.6, 67.2], // Mehrgarh / Bolan
  [31.6, 66.8], // northern Balochistan
  [34.0, 70.0], // Gandhara / Kabul valley margin
]
