import {
  Text,
  View,
  ViewStyle,
  Pressable,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { CustomIcon } from '../utils/CustomIcon';
import Colors from '../../constants/Colors';

interface NumberInputProps {
  onChange: (e: number) => void;
  /**
   * View Styles for container.
   * Overrides component styles.
   */
  style?: ViewStyle;
  amount: number;
  step?: number;
}

export default function NumberInput({
  onChange,
  step,
  style,
  amount,
}: NumberInputProps) {
  const colorScheme = useColorScheme();

  const onIncrement = () => {
    onChange(amount + (step || 0.5));
  };
  const onDecrement = () => {
    if (amount === 0) return;
    onChange(amount - (step || 0.5));
  };

  return (
    <View style={{ ...stylesheetStyles.container, ...style }}>
      <Pressable onPress={onDecrement}>
        <CustomIcon
          disabled={amount === 0}
          color={Colors[colorScheme ?? 'light'].text}
          size={40}
          iconName='minuscircleo'
          iconLibraryName='AntDesign'
        />
      </Pressable>
      <View>
        <Text style={{ fontSize: 18 }}>{amount}</Text>
      </View>
      <Pressable onPress={onIncrement}>
        <CustomIcon
          color={Colors[colorScheme ?? 'light'].text}
          size={40}
          iconName='pluscircleo'
          iconLibraryName='AntDesign'
        />
      </Pressable>
    </View>
  );
}

const stylesheetStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
});
