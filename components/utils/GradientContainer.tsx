import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme, ViewProps, Platform, ViewStyle, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GradientContainerProps {
  children: JSX.Element | JSX.Element[];
  styles?: ViewStyle;
  safeAreaStyle?: ViewStyle;
}

// Adjust this value to control where the line cuts through the buttons.
// If your buttons are 80px tall, set this to roughly 40.
const BOTTOM_OFFSET = 80;

export default function GradientContainer({
  children,
  styles,
  safeAreaStyle,
}: GradientContainerProps) {
  const colorScheme = useColorScheme() || 'light';
  const startColor = colorScheme === 'light' ? '#D6FADE' : '#121E4A';
  const endColor = colorScheme === 'light' ? '#F2E4EB' : '#00AA8B';

  return (
    <View style={{
      width: '100%',
      position: 'relative', // Necessary for the absolute child to work
      ...styles
    }}>
     
      {/*
        THE RESPONSIVE GRADIENT
        It sits behind the content.
        top: 0 -> Starts at the very top
        bottom: BOTTOM_OFFSET -> Stops 50px before the bottom of this container.
      */}
      <LinearGradient
        colors={[startColor, endColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 0.3 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: BOTTOM_OFFSET, // This creates the "half-button" effect automatically
        }}
      />

      {/*
        THE CONTENT
        This determines the actual height of the component.
        As this grows (more text, bigger fonts), the gradient grows with it.
      */}
      {Platform.OS === 'ios' ? (
        <SafeAreaView
          style={safeAreaStyle}
          edges={['top']} // We only want to pad the top (status bar)
        >
          {children}
        </SafeAreaView>
      ) : (
        <View style={safeAreaStyle}>
          {children}
        </View>
      )}
    </View>
  );
}