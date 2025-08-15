import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const EyeIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12C2.73 7.05 7.17 3.5 12 3.5c4.83 0 9.27 3.55 11 8.5-1.73 4.95-6.17 8.5-11 8.5-4.83 0-9.27-3.55-11-8.5z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
