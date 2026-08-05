// Beat grid: track is ~95 BPM -> one beat = 60/95 * 30fps ≈ 18.9 frames, rounded to 19.
export const FPS = 30;
export const BEAT = 19;

// Convert a count of beats into a frame number on the beat grid.
export const beats = (n: number) => Math.round(n * BEAT);

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION = 900;

export const COLORS = {
  bg: '#0d0d14',
  white: '#f5f5f7',
  coral: '#ff6b5e',
  cyan: '#3ee8e0',
  yellow: '#ffd23f',
  violet: '#a685ff',
  magenta: '#ff5ec4',
} as const;

export const PALETTE = [COLORS.coral, COLORS.cyan, COLORS.yellow, COLORS.violet, COLORS.magenta];

export const FONT_HEADING = 'Space Grotesk';
export const FONT_BODY = 'Inter';

// Scene boundaries snapped to the nearest whole beat (BEAT = 19 frames).
// Requested cut points (150/450/660/840) land near beats 8/24/35/44 -> snap there.
export const SCENES = {
  hook: {start: 0, end: beats(8)}, // 0-152
  tokenization: {start: beats(8), end: beats(24)}, // 152-456
  stats: {start: beats(24), end: beats(35)}, // 456-665
  contextWindow: {start: beats(35), end: beats(44)}, // 665-836
  outro: {start: beats(44), end: DURATION}, // 836-900
};
