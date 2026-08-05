import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

export const interFont = 'Inter';
export const spaceGroteskFont = 'Space Grotesk';

// Self-hosted variable fonts (downloaded once into public/fonts) instead of
// @remotion/google-fonts, which fetches from the Google Fonts CDN at render
// time inside headless Chrome — that fetch fails in this environment because
// the browser doesn't trust the outbound proxy's CA certificate.
export const fontsLoaded = Promise.all([
  loadFont({
    family: interFont,
    url: staticFile('fonts/Inter-Variable.woff2'),
    weight: '100 900',
    display: 'block',
  }),
  loadFont({
    family: spaceGroteskFont,
    url: staticFile('fonts/SpaceGrotesk-Variable.woff2'),
    weight: '100 900',
    display: 'block',
  }),
]);
