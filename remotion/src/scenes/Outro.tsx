import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {BEAT, COLORS} from '../constants';
import {spaceGroteskFont} from '../fonts';

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, BEAT], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [0, BEAT], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div
        style={{
          fontFamily: spaceGroteskFont,
          fontWeight: 700,
          fontSize: 96,
          color: COLORS.white,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        Now you know.
      </div>
    </AbsoluteFill>
  );
};
