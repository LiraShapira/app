import {Text, useColorScheme, StyleSheet, View} from "react-native";
import Colors from "../../constants/Colors";

interface TransactionItemAmountProps {
  income: boolean;
  amount: number;
}

export default function TransactionItemAmount({income, amount}: TransactionItemAmountProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const color = income ? Colors.light.highlight : Colors.light.warning;

  return (
      <View style={styles.amountDisplay}>
        <Text
            style={{
        color,
              fontSize: 24,
            }}
        >
          {income ? '+' : '-'}
        </Text>
        <Text
            style={{
        color,
              fontSize: 24,
            }}
        >
          {amount}
        </Text>
      </View>
  )
}

const styles = StyleSheet.create({
  amountDisplay: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'right',
    alignItems: 'flex-start',
    fontWeight: '600',
    fontSize: '40',
  },
});



