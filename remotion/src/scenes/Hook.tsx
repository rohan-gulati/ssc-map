import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BEAT, COLORS, PALETTE} from '../constants';
import {interFont, spaceGroteskFont} from '../fonts';
import {TokenPill} from '../components/TokenPill';

const SENTENCE = "AI doesn't read words";
const WORDS = SENTENCE.split(' ');

// Deterministic pseudo-random scatter per chunk index, so the shatter is
// reproducible across renders but still feels organic.
const scatter = (i: number) => ({
  x: Math.sin(i * 12.9) * 90,
  y: Math.cos(i * 7.3) * 70,
  rotate: Math.sin(i * 5.1) * 14,
});

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Beat 0: TOKENS slams in.
  const tokensScale = spring({
    frame,
    fps,
    config: {damping: 10, stiffness: 140, mass: 0.6},
    durationInFrames: BEAT,
  });
  const tokensOpacity = interpolate(frame, [BEAT * 2, BEAT * 2 + 8], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Beats 2-5: sentence types out.
  const typeStart = BEAT * 2;
  const typeEnd = BEAT * 5;
  const revealedChars = Math.floor(
    interpolate(frame, [typeStart, typeEnd], [0, SENTENCE.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const typedText = SENTENCE.slice(0, revealedChars);
  const sentenceOpacity = interpolate(frame, [typeStart, typeStart + 4, BEAT * 6, BEAT * 6 + 6], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Beat 6: shatter into colored word-chunks.
  const shatterStart = BEAT * 6;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          fontFamily: spaceGroteskFont,
          fontWeight: 900,
          fontSize: 220,
          color: COLORS.white,
          letterSpacing: -4,
          transform: `scale(${tokensScale})`,
          opacity: tokensOpacity,
        }}
      >
        TOKENS
      </div>

      <div
        style={{
          position: 'absolute',
          fontFamily: interFont,
          fontWeight: 700,
          fontSize: 76,
          color: COLORS.white,
          opacity: sentenceOpacity,
          padding: '0 80px',
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        {typedText}
        {revealedChars < SENTENCE.length && frame >= typeStart ? (
          <span style={{opacity: frame % 20 < 10 ? 1 : 0, color: COLORS.coral}}>|</span>
        ) : null}
      </div>

      {frame >= shatterStart && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '0 60px',
          }}
        >
          {WORDS.map((word, i) => {
            const local = frame - (shatterStart + i * 2);
            const s = spring({
              frame: local,
              fps,
              config: {damping: 9, stiffness: 120, mass: 0.7},
              durationInFrames: BEAT * 2,
            });
            const {x, y, rotate} = scatter(i);
            return (
              <TokenPill
                key={word}
                text={word}
                color={PALETTE[i % PALETTE.length]}
                fontSize={44}
                style={{
                  transform: `translate(${x * s}px, ${y * s}px) rotate(${rotate * s}deg) scale(${s})`,
                  opacity: s,
                }}
              />
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
