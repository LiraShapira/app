import {
  Text,
  View,
  ViewStyle,
  Pressable,
  StyleSheet,
  useColorScheme,
  TextInput,
} from 'react-native';
import { CustomIcon } from '../utils/CustomIcon';
import Colors from '../../constants/Colors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  decrementByAmount,
  incrementByAmount,
  selectValue,
  setAmount,
} from '../../store/depositFormSlice';

interface NumberInputProps {
  /**
   * View Styles for container.
   * Overrides component styles.
   */
  style?: ViewStyle;
  step?: number;
}

export default function NumberInput({ step = 1, style }: NumberInputProps) {
  const colorScheme = useColorScheme();
  const value = useAppSelector(selectValue);
  const dispatch = useAppDispatch();

  
  const onChangeAmount = (amount: string) => {
    if (!amount) {
      dispatch(setAmount(0));
      return;
    }
    if (!parseInt(amount)) {
    dispatch(setAmount(0));
    return;
    }

    if (Number.isNaN(parseInt(amount))) {
    dispatch(setAmount(0));
      return;
    }
    dispatch(setAmount(parseInt(amount)));
  };

  return (
    <View style={{ ...stylesheetStyles.container, ...style }}>
      <Pressable onPress={() => dispatch(decrementByAmount(step))}>
        <CustomIcon
          disabled={value === 0}
          color={Colors[colorScheme ?? 'light'].text}
          size={40}
          iconName="minuscircleo"
          iconLibraryName="AntDesign"
        />
      </Pressable>
      <View style={{ width: '20%' }}>
           <TextInput
          autoFocus
          style={{
            color: Colors[colorScheme ?? 'light'].text,
          }}
          value={value.toString()}
          maxLength={2}
          onChangeText={onChangeAmount}
          inputMode='numeric'
        />
      </View>
      <Pressable onPress={() => dispatch(incrementByAmount(step))}>
        <CustomIcon
          disabled={value === 99}
          color={Colors[colorScheme ?? 'light'].text}
          size={40}
          iconName="pluscircleo"
          iconLibraryName="AntDesign"
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
