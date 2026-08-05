import React from 'react';
import {AbsoluteFill, Audio, Series, staticFile} from 'remotion';
import {COLORS, SCENES} from './constants';
import {Hook} from './scenes/Hook';
import {Tokenization} from './scenes/Tokenization';
import {Stats} from './scenes/Stats';
import {ContextWindow} from './scenes/ContextWindow';
import {Outro} from './scenes/Outro';

export const TokensReel: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
      <Audio src={staticFile('token-rap.mp3')} />
      <Series>
        <Series.Sequence durationInFrames={SCENES.hook.end - SCENES.hook.start}>
          <Hook />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={SCENES.tokenization.end - SCENES.tokenization.start}
        >
          <Tokenization />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.stats.end - SCENES.stats.start}>
          <Stats />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={SCENES.contextWindow.end - SCENES.contextWindow.start}
        >
          <ContextWindow />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.outro.end - SCENES.outro.start}>
          <Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
