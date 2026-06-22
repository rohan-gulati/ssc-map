# Sindhu–Saraswati Civilization — Interactive Site Map

An interactive map of the **Sindhu-Saraswati civilization** (also called the
Indus Valley Civilization / Harappan civilization), built to show the true
**scale and depth** of the civilization across the Indian subcontinent.

The popular impression is that Mohenjo-daro and Harappa were the only great
cities. The archaeology says otherwise. Decades of survey and excavation —
from the Cholistan giants to the Ghaggar-Hakra (Saraswati) basin sites of
Haryana and Rajasthan — show a vast, densely-settled civilization. **Rakhigarhi
in Haryana, at roughly 550 hectares, is the largest known Harappan site by
area** — larger than Mohenjo-daro — and this map is designed to make that
immediately visible.

## What the map shows

- **25 sites** spanning Afghanistan (Shortugai), the Makran coast (Sutkagan
  Dor), Sindh, Punjab, the Saraswati basin, Kutch & Saurashtra, and the upper
  Ganga-Yamuna doab (Alamgirpur, Sinauli) — **16 of them in modern India**,
  including the largest (Rakhigarhi) and the densest Mature-Harappan cluster.
- **Accurate boundaries**: India's official Survey-of-India national boundary
  is drawn as an overlay, showing **Jammu & Kashmir (incl. Aksai Chin) and
  Arunachal Pradesh as part of India**. The basemap uses label-only tiles
  without contradicting disputed-boundary lines. Boundary geometry derived
  from [DataMeet maps](https://github.com/datameet/maps), simplified for web.
- **Marker size = settlement area** (square-root scaled), so the largest
  cities — Rakhigarhi, Mohenjo-daro, Mehrgarh, Dholavira — visually dominate.
- **Marker colour = tier** (major urban centre / secondary town / frontier
  outpost).
- A translucent **civilization-extent overlay** conveying the overall
  geographic spread at a glance.
- Click any site for a detail panel: period of occupation, area, significance,
  excavation history, and **explicit source citations**.

## Data & sourcing

Site data lives in [`src/data/sites.json`](src/data/sites.json). Every entry
carries a `sources` array so each claim is traceable. The dataset draws on
primary excavation reports and peer-reviewed archaeological and genetic
literature rather than secondary political commentary, including:

- **Archaeological Survey of India** excavation reports & *Indian Archaeology: A Review*
- Gregory L. Possehl, *The Indus Civilization: A Contemporary Perspective* (2002)
- Jonathan Mark Kenoyer, *Ancient Cities of the Indus Valley Civilization* (1998)
- Rita P. Wright, *The Ancient Indus* (2010)
- B. B. Lal & B. K. Thapar — Kalibangan excavation volumes
- J. P. Joshi — Surkotada, Manda
- Vasant Shinde et al. (2019), *Cell* — the Rakhigarhi ancient-genome study
- M. R. Mughal, *Ancient Cholistan* (1997); H.-P. Francfort on Shortugai

The extent polygon in [`src/data/extent.js`](src/data/extent.js) is a
deliberately smoothed, illustrative hull of the site distribution — not a
precise archaeological isopleth.

## Tech stack

- **React + Vite**
- **Leaflet** via **react-leaflet** (no API key required)
- CARTO light basemap tiles + OpenStreetMap data

## Running locally

```bash
npm install
npm run dev      # start dev server (default http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Contributing data

To add or refine a site, edit `src/data/sites.json`. Each object needs:
`id`, `name`, `modernLocation`, `lat`, `lng`, `areaHectares`, `period`,
`tier` (`major` | `secondary` | `outpost`), `significance`,
`excavationNotes`, and a `sources` array. Please cite a verifiable
archaeological source for any factual claim.
