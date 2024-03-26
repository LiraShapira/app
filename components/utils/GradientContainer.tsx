import { LinearGradient } from 'expo-linear-gradient';
import { ViewProps } from 'react-native';

interface GradientContainerProps {
  children: JSX.Element | JSX.Element[];
  styles?: ViewProps;
  startColor?: string;
  endColor?: string;
}

/**
 * GradientComponent displays a gradient background from startColor to endColor.
 *
 * @component
 * @example
 * // Display default green to pink gradient
 * <GradientComponent />
 *
 * // Display custom gradient with specified colors
 * <GradientComponent startColor="#FF5733" endColor="#33FF57" />
 *
 * @param {string} [props.startColor='#00FF00'] - The starting color of the gradient. Default is green #D6FADE.
 * @param {string} [props.endColor='#FF69B4'] - The ending color of the gradient. Default is pink #EBDCF7.
 *
 */
export default function GradientContainer({
  children,
  styles,
  startColor ='#D6FADE',
  endColor = '#F2E4EB',
}: GradientContainerProps) {
  return (
    <LinearGradient
      colors={[startColor, endColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 0.3 }}
      style={{
        width: '100%',
        position: 'relative',
        height: '100%',
        padding: 8,
        ...styles,
      }}
    >
      {children}
    </LinearGradient>
  );
}
