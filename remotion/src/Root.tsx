import React from 'react';
import {Composition} from 'remotion';
import {TokensReel} from './TokensReel';
import {DURATION, FPS, HEIGHT, WIDTH} from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TokensReel"
      component={TokensReel}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
