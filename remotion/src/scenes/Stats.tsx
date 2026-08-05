import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BEAT, COLORS} from '../constants';
import {interFont, spaceGroteskFont} from '../fonts';

const StatCard: React.FC<{
  startBeat: number;
  label: string;
  big: string;
  unit: string;
  accent: string;
  fps: number;
  frame: number;
  fromRotate: number;
}> = ({startBeat, label, big, unit, accent, fps, frame, fromRotate}) => {
  const local = frame - startBeat * BEAT;
  const s = spring({
    frame: local,
    fps,
    config: {damping: 10, stiffness: 110, mass: 0.8},
    durationInFrames: BEAT * 2,
  });
  const rotate = interpolate(s, [0, 1], [fromRotate, 0]);

  return (
    <div
      style={{
        opacity: s,
        transform: `scale(${s}) rotate(${rotate}deg)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 780,
        padding: '48px 20px',
        borderRadius: 40,
        border: `4px solid ${accent}`,
        background: 'rgba(255,255,255,0.03)',
      }}
    >
      <div
        style={{
          fontFamily: interFont,
          fontWeight: 600,
          fontSize: 32,
          color: COLORS.white,
          opacity: 0.8,
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: spaceGroteskFont,
          fontWeight: 900,
          fontSize: 190,
          color: accent,
          lineHeight: 1,
        }}
      >
        {big}
      </div>
      <div
        style={{
          fontFamily: interFont,
          fontWeight: 700,
          fontSize: 40,
          color: COLORS.white,
          letterSpacing: 4,
        }}
      >
        {unit}
      </div>
    </div>
  );
};

export const Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const card1Y = interpolate(frame, [0, BEAT * 2], [0, -170], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{position: 'relative', width: '100%', height: 1400}}>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, calc(-50% + ${card1Y}px))`}}>
          <StatCard
            startBeat={0}
            label="1 TOKEN ≈"
            big="4"
            unit="CHARACTERS"
            accent={COLORS.coral}
            fps={fps}
            frame={frame}
            fromRotate={-9}
          />
        </div>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 300px)'}}>
          <StatCard
            startBeat={5}
            label="100 TOKENS ≈"
            big="75"
            unit="WORDS"
            accent={COLORS.cyan}
            fps={fps}
            frame={frame}
            fromRotate={8}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
