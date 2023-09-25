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
}

export default function CustomButton({
  text,
  onPress,
  disabled = false,
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
            padding: 8,
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
