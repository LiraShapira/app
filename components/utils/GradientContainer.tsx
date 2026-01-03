import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme, ViewProps, Platform, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GradientContainerProps {
  children: JSX.Element | JSX.Element[];
  styles?: ViewStyle;
  safeAreaStyle?: ViewStyle;
}

export default function GradientContainer({
  children,
  styles,
  safeAreaStyle,
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
        flex: 1,
        position: 'relative',
        padding: 8,
        width: '100%',
        overflow: 'hidden', // Ensure gradient doesn't extend beyond bounds
        ...styles,
      }}
    >
      <SafeAreaView
        style={[{ flex: 1 }, safeAreaStyle]}
        edges={Platform.OS === 'ios' ? ['top', 'bottom'] : []}
      >
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
}
