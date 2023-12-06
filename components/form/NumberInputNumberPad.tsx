import {
  Text,
  useColorScheme,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import Colors from '../../constants/Colors';
import { parseNumberPadInput } from '../../utils/functions';

export type NumberLabel =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'ret'
  | '.';

interface NumberPadButtonProps {
  n: NumberLabel;
  onPress: (n: NumberLabel) => void;
}

const NumberPadButton = ({ n, onPress }: NumberPadButtonProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <Pressable
      style={({ pressed }) => ({
        // TODO backgroundColor: pressed ? 'none' : 'green'
      })}
    >
      {n === 'ret' ? (
        <View>
          <Text
            style={{ color: Colors[colorScheme].text, fontSize: 30 }}
            onPress={() => onPress(n)}
          >
            x
          </Text>
        </View>
      ) : (
        <View>
          <Text
            style={{ color: Colors[colorScheme].text, fontSize: 30 }}
            onPress={() => onPress(n)}
          >
            {n}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

interface NumberInputNumberPadProps {
  value: string;
  setValue: (n: string) => void;
}

const NumberInputNumberPad = ({
  value,
  setValue,
}: NumberInputNumberPadProps) => {
  const colorScheme = useColorScheme() ?? 'light';

  const onPress = (n: NumberLabel) => {
    const newValue = parseNumberPadInput(n, value);
    // NB! conditional on false required because 0 falsy value
    if (newValue !== false) setValue(newValue);
  };

  return (
    <View style={styles.numberPad}>
      <Text
        style={{ ...styles.numberPadValue, color: Colors[colorScheme].text }}
      >
        {value}
      </Text>
      <View style={styles.numberPadRow}>
        <NumberPadButton n={'1'} onPress={onPress} />
        <NumberPadButton n={'2'} onPress={onPress} />
        <NumberPadButton n={'3'} onPress={onPress} />
      </View>
      <View style={styles.numberPadRow}>
        <NumberPadButton n={'4'} onPress={onPress} />
        <NumberPadButton n={'5'} onPress={onPress} />
        <NumberPadButton n={'6'} onPress={onPress} />
      </View>
      <View style={styles.numberPadRow}>
        <NumberPadButton n={'7'} onPress={onPress} />
        <NumberPadButton n={'8'} onPress={onPress} />
        <NumberPadButton n={'9'} onPress={onPress} />
      </View>
      <View style={styles.numberPadRow}>
        <NumberPadButton n={'.'} onPress={onPress} />
        <NumberPadButton n={'0'} onPress={onPress} />
        <NumberPadButton n={'ret'} onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  numberPad: {
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
  },
  numberPadValue: {
    height: 100,
    fontSize: 45,
    alignSelf: 'center',
  },
  numberPadButton: {},
  numberPadRow: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default NumberInputNumberPad;
