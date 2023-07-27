import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import Switch from '../../components/form/Switch';

interface DepositFormSwitchProps {
  switchLabels: string[];
  title: string;
  onPress: (v: string) => void;
}

export default function DepositFormSwitch({
  switchLabels,
  title,
  onPress,
}: DepositFormSwitchProps) {
  const colorScheme = useColorScheme();
  const options = switchLabels.map((l) => ({ label: l, value: l }));

  return (
    <View style={styles.depositSwitchContainer}>
      <View style={styles.depositSwitch}>
        <Text
          style={{
            fontSize: 18,
            color: Colors[colorScheme ?? 'light'].text,
          }}
        >
          {title}
        </Text>
      </View>
      <View style={styles.depositSwitchLabel}>
        <Switch
          buttonColor={Colors[colorScheme ?? 'light'].tint}
          initial={1}
          onPress={onPress}
          selectedColor={Colors[colorScheme ?? 'light'].background}
          backgroundColor={Colors[colorScheme ?? 'light'].shading}
          options={options}
          textColor={Colors[colorScheme ?? 'light'].text}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  depositSwitchContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  depositSwitch: { flex: 1 },
  depositSwitchLabel: { flex: 1 },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    borderRadius: 100,
    width: 200,
    // alignContent: 'center',
    alignItems: 'center',
  },
});
