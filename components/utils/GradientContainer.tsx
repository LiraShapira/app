import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme, StyleProp, ViewStyle, StyleSheet } from 'react-native';

interface GradientContainerProps {
  children: JSX.Element | JSX.Element[];
  styles?: StyleProp<ViewStyle>;
}

export default function GradientContainer({
  children,
  styles: stylesProp,
}: GradientContainerProps) {
  const colorScheme = useColorScheme() || 'light';
  const startColor = colorScheme === 'light' ? '#D6FADE' : '#121E4A';
  const endColor = colorScheme === 'light' ? '#F2E4EB' : '#00AA8B';

  // Flatten so arrays (e.g. [styleA, styleB]) become a single object for web DOM
  const flattenedStyles = stylesProp != null ? StyleSheet.flatten(stylesProp) : undefined;

  return (
    <LinearGradient
      colors={[startColor, endColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 0.3 }}
      style={{
        width: '100%',
        position: 'relative',
        flex: 1,
        minHeight: 0,
        padding: 8,
        ...flattenedStyles,
      }}
    >
      {children}
    </LinearGradient>
  );
}
