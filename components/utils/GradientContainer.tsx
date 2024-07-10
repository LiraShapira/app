import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme, ViewProps } from 'react-native';

interface GradientContainerProps {
  children: JSX.Element | JSX.Element[];
  styles?: ViewProps;
}

export default function GradientContainer({
  children,
  styles,
}: GradientContainerProps) {
  const colorScheme = useColorScheme() || 'light';
  const startColor = colorScheme === 'light' ? '#D6FADE' : '#121E4A';
  const endColor = colorScheme === 'light' ? '#F2E4EB' : '#00AA8B';

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
