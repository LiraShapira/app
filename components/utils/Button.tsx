import {
  View,
  Pressable,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Colors from '../../constants/Colors';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onPress: (...args: any[]) => any;
}

export default function Button({
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
    borderRadius: 200,
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
