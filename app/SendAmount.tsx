import { Text, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

export default function SendAmount() {
  const colorScheme = useColorScheme();

  return (
    <Text
      style={{
        color: Colors[colorScheme ?? 'light'].text,
      }}
    >
      SendAmount
    </Text>
  );
}
