// leftChevronIcon.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LeftChevronIcon = ({ width = 28, height = 28, fill = '#424242' }) => (
  <Svg width={width} height={height} viewBox="0 0 28 28">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.7899 7.41005C18.3367 7.95678 18.3367 8.84322 17.7899 9.38995L13.1799 14L17.7899 18.6101C18.3367 19.1568 18.3367 20.0432 17.7899 20.5899C17.2432 21.1367 16.3568 21.1367 15.81 20.5899L10.21 14.9899C9.66332 14.4432 9.66332 13.5568 10.21 13.0101L15.81 7.41005C16.3568 6.86332 17.2432 6.86332 17.7899 7.41005Z"
      fill={fill}
    />
  </Svg>
);

export default LeftChevronIcon;
