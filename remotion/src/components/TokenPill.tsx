import React from 'react';
import {spaceGroteskFont} from '../fonts';

export const TokenPill: React.FC<{
  text: string;
  color: string;
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({text, color, fontSize = 34, style}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: color,
      color: '#0d0d14',
      borderRadius: 18,
      padding: '10px 26px',
      fontWeight: 700,
      fontSize,
      fontFamily: spaceGroteskFont,
      whiteSpace: 'pre',
      lineHeight: 1,
      ...style,
    }}
  >
    {text}
  </div>
);
