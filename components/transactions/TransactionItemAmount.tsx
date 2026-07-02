import { useColorScheme, StyleSheet, View } from "react-native";
import { Text } from "../Themed";
import Colors from "../../constants/Colors";

interface TransactionItemAmountProps {
  income: boolean;
  amount: number | string;
  isRequest: boolean;
}

export default function TransactionItemAmount({ income, amount, isRequest }: TransactionItemAmountProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const color = isRequest ? Colors.light.tint : income ? Colors.light.highlight : Colors.light.warning;

  return (
    <View style={styles.amountDisplay}>
      {
        isRequest ? null : (<Text
          style={{
            color,
            fontSize: 24,
            fontWeight: '600'
          }}
        >
          {income ? '+' : '-'}
        </Text>)
      }
      <Text
        style={{
          color,
          fontSize: 24,
          fontWeight: '600'
        }}
      >
        {typeof amount === 'string'
          ? (Number.isFinite(parseFloat(amount)) ? parseFloat(amount).toFixed(2) : '0.00')
          : (typeof amount === 'number' && Number.isFinite(amount) ? amount.toFixed(2) : '0.00')}
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



