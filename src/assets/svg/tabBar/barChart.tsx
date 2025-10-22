import Svg, { Rect } from 'react-native-svg';
import { COLORS } from '../../../utils/colorConstant';

interface BarChartIconProps {
  fillColor: string;
  width: number;
  height: number;
}

export const BarChartIcon: React.FC<BarChartIconProps> = ({
  fillColor = COLORS.shadesOfGrey.greyOne,
  width = 34,
  height = 34,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="8" width="3.5" height="13" rx="0.5" fill={fillColor} />
      <Rect x="9" y="4" width="3.5" height="17" rx="0.5" fill={fillColor} />
      <Rect x="15" y="11" width="3.5" height="10" rx="0.5" fill={fillColor} />
    </Svg>
  );
};
