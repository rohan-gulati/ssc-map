import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BEAT, COLORS, PALETTE} from '../constants';
import {interFont} from '../fonts';
import {TokenPill} from '../components/TokenPill';

type Example = {
  full: string;
  chunks: string[];
  plainStartBeat: number;
  chunkStartBeat: number;
};

const EXAMPLES: Example[] = [
  {
    full: 'Understanding tokens',
    chunks: ['Under', 'standing', ' tokens'],
    plainStartBeat: 0,
    chunkStartBeat: 2,
  },
  {
    full: 'unbelievable',
    chunks: ['un', 'believ', 'able'],
    plainStartBeat: 6,
    chunkStartBeat: 7,
  },
];

const CAPTION_BEAT = 10;

const ExampleBlock: React.FC<{example: Example; frame: number; fps: number}> = ({
  example,
  frame,
  fps,
}) => {
  const plainStart = example.plainStartBeat * BEAT;
  const chunkStart = example.chunkStartBeat * BEAT;

  const plainOpacity = interpolate(
    frame,
    [plainStart, plainStart + 6, chunkStart, chunkStart + 8],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const rowOpacity = interpolate(frame, [chunkStart, chunkStart + 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'relative', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          position: 'absolute',
          fontFamily: interFont,
          fontWeight: 700,
          fontSize: 68,
          color: COLORS.white,
          opacity: plainOpacity,
        }}
      >
        {example.full}
      </div>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          gap: 14,
          opacity: rowOpacity,
        }}
      >
        {example.chunks.map((chunk, i) => {
          const local = frame - (chunkStart + i * BEAT);
          const s = spring({
            frame: local,
            fps,
            config: {damping: 11, stiffness: 160, mass: 0.6},
            durationInFrames: BEAT,
          });
          return (
            <TokenPill
              key={chunk + i}
              text={chunk}
              color={PALETTE[i % PALETTE.length]}
              fontSize={40}
              style={{transform: `scale(${s})`, opacity: s}}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Tokenization: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const captionStart = CAPTION_BEAT * BEAT;
  const captionOpacity = interpolate(frame, [captionStart, captionStart + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 60}}>
        {EXAMPLES.map((example) => (
          <ExampleBlock key={example.full} example={example} frame={frame} fps={fps} />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 220,
          fontFamily: interFont,
          fontWeight: 600,
          fontSize: 34,
          color: COLORS.cyan,
          opacity: captionOpacity,
          textAlign: 'center',
          padding: '0 90px',
        }}
      >
        words get split into sub-word pieces
      </div>
    </AbsoluteFill>
  );
};
