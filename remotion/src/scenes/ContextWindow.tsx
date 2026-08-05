import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BEAT, COLORS, PALETTE} from '../constants';
import {interFont, spaceGroteskFont} from '../fonts';

const HALF_BEAT = BEAT / 2;
const COLUMNS = 7;
const ROWS = 2;
const TOTAL_PILLS = COLUMNS * ROWS;
const FILL_END_FRAME = TOTAL_PILLS * HALF_BEAT; // beat 7 (133f)
const TARGET_TOKENS = 200000;
const CAPTION_BEAT = 7.5;

const formatTokens = (value: number) => {
  if (value >= 1000) {
    return `${Math.round(value / 1000)}K`;
  }
  return `${Math.round(value)}`;
};

export const ContextWindow: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const tokenValue = interpolate(frame, [0, FILL_END_FRAME], [0, TARGET_TOKENS], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const captionOpacity = interpolate(
    frame,
    [CAPTION_BEAT * BEAT, CAPTION_BEAT * BEAT + 8],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48}}>
        <div
          style={{
            fontFamily: spaceGroteskFont,
            fontWeight: 700,
            fontSize: 46,
            color: COLORS.white,
            letterSpacing: 4,
          }}
        >
          CONTEXT WINDOW
        </div>

        <div
          style={{
            width: 860,
            minHeight: 420,
            borderRadius: 44,
            border: `4px solid ${COLORS.violet}`,
            background: 'rgba(255,255,255,0.03)',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            gap: 16,
            padding: 32,
          }}
        >
          {Array.from({length: TOTAL_PILLS}).map((_, i) => {
            const spawnFrame = i * HALF_BEAT;
            const local = frame - spawnFrame;
            const s = spring({
              frame: local,
              fps,
              config: {damping: 12, stiffness: 200, mass: 0.5},
              durationInFrames: BEAT,
            });
            return (
              <div
                key={i}
                style={{
                  width: 96,
                  height: 64,
                  borderRadius: 14,
                  background: PALETTE[i % PALETTE.length],
                  opacity: s,
                  transform: `scale(${s})`,
                }}
              />
            );
          })}
        </div>

        <div
          style={{
            fontFamily: interFont,
            fontWeight: 700,
            fontSize: 44,
            color: COLORS.yellow,
            display: 'flex',
            gap: 14,
            alignItems: 'baseline',
          }}
        >
          <span style={{color: COLORS.white, opacity: 0.7, fontSize: 34}}>tokens used:</span>
          <span>{formatTokens(tokenValue)}</span>
        </div>

        <div
          style={{
            fontFamily: interFont,
            fontWeight: 600,
            fontSize: 34,
            color: COLORS.cyan,
            opacity: captionOpacity,
            textAlign: 'center',
            padding: '0 90px',
          }}
        >
          every token counts — memory and cost
        </div>
      </div>
    </AbsoluteFill>
  );
};
