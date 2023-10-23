import {
  View,
  Pressable,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Colors from '../../constants/Colors';

export interface ButtonProps {
  text: string;
  disabled?: boolean;
  onPress: (...args: any[]) => any;
  size?: 's' | 'm' | 'l';
}

const widthSizeMap = {
  s: 100,
  m: 140,
  l: 220,
};

const heightSizeMap = {
  s: 18,
  m: 24,
  l: 32,
};

const fontSizeMap = {
  s: 12,
  m: 16,
  l: 24,
};

export default function CustomButton({
  text,
  onPress,
  disabled = false,
  size = 'm',
}: ButtonProps) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        backgroundColor: Colors[colorScheme ?? 'light'].shading,
        ...styles.submitButton,
      }}
    >
      <Pressable
        disabled={disabled}
        style={{ opacity: disabled ? 0.4 : 1 }}
        onPress={onPress}
      >
        <Text
          style={{
            fontSize: fontSizeMap[size],
            color: Colors[colorScheme ?? 'light'].text,
          }}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
