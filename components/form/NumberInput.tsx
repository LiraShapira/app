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
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  decrementByAmount,
  incrementByAmount,
  selectValue,
} from '../../store/depositFormSlice';

interface NumberInputProps {
  /**
   * View Styles for container.
   * Overrides component styles.
   */
  style?: ViewStyle;
  step?: number;
}

export default function NumberInput({ step = 0.5, style }: NumberInputProps) {
  const colorScheme = useColorScheme();
  const value = useAppSelector(selectValue);
  const dispatch = useAppDispatch();

  return (
    <View style={{ ...stylesheetStyles.container, ...style }}>
      <Pressable onPress={() => dispatch(decrementByAmount(step))}>
        <CustomIcon
          disabled={value === 0}
          color={Colors[colorScheme ?? 'light'].text}
          size={40}
          iconName='minuscircleo'
          iconLibraryName='AntDesign'
        />
      </Pressable>
      <View>
        <Text style={{ fontSize: 18 }}>{value}</Text>
      </View>
      <Pressable onPress={() => dispatch(incrementByAmount(step))}>
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
