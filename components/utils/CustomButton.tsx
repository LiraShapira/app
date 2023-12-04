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
  textColor?: string; 
  backgroundColor?: string; 
  onPress: (...args: any[]) => any;
  size?: 's' | 'm' | 'l';
}

const fontSizeMap = {
  s: 12,
  m: 14,
  l: 24,
};

export default function CustomButton({
  text,
  onPress,
  disabled = false,
  size = 'm',
  textColor,
  backgroundColor,
}: ButtonProps) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        backgroundColor: backgroundColor || Colors[colorScheme ?? 'light'].shading,
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
            fontWeight: '700',
            fontSize: fontSizeMap[size],
            color: textColor || Colors[colorScheme ?? 'light'].text
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
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
