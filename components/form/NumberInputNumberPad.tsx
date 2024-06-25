import { Text, useColorScheme, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import { parseNumberPadInput } from '../../utils/functions';
import i18n from '../../translationService';
import { getLocales } from 'expo-localization';

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
    <View>
      {n === 'ret' ? (
        <View>
          <Text
            style={{
              ...styles.numberPadButton,
              color: Colors[colorScheme].text,
            }}
            onPress={() => onPress(n)}
          >
            x
          </Text>
        </View>
      ) : (
        <View>
          <Text
            style={{
              ...styles.numberPadButton,
              color: Colors[colorScheme].text,
            }}
            onPress={() => onPress(n)}
          >
            {n}
          </Text>
        </View>
      )}
    </View>
  );
};

interface NumberInputNumberPadProps {
  value: string;
  setValue: (n: string) => void;
  prependedText?: string;
  appendedText?: string;
}

const textDirection = getLocales()[0].textDirection || 'ltr';
const NumberInputNumberPad = ({
  value,
  setValue,
  prependedText,
  appendedText,
}: NumberInputNumberPadProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const onPress = (n: NumberLabel) => {
    const newValue = parseNumberPadInput(n, value);
    // NB! conditional on false required because 0 falsy value
    if (newValue !== false) setValue(newValue);
  };
  return (
    <View style={{ flexDirection: 'column', gap: 20 }}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {prependedText && (
            <Text
              style={{
                position: 'absolute',
                ...(textDirection === 'ltr' && { left: 60 }),
                ...(textDirection === 'rtl' && { right: 60 }),
                fontSize: 20,
                color: Colors[colorScheme].text,
              }}
            >
              {prependedText}
            </Text>
          )}
          <Text
            style={{ ...styles.inputtedValue, color: Colors[colorScheme].text }}
          >
            {value}
          </Text>
          {appendedText && (
            <Text
              style={{
                position: 'absolute',
                ...(textDirection === 'ltr' && { right: 60 }),
                ...(textDirection === 'rtl' && { left: 60 }),
                fontSize: 20,
                color: Colors[colorScheme].text,
              }}
            >
              {appendedText}
            </Text>
          )}
        </View>
        <View
          style={{
            borderBottomColor: Colors[colorScheme].text,
            borderBottomWidth: 1,
          }}
        ></View>
      </View>
      <View style={styles.numberPad}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  numberPad: {
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
    alignItems: 'center',
  },
  inputtedValue: {
    height: 80,
    fontSize: 48,
    marginVertical: 0,
    marginHorizontal: 'auto',
  },
  numberPadButton: {
    fontSize: 48,
  },
  numberPadRow: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 80,
  },
});

export default NumberInputNumberPad;
