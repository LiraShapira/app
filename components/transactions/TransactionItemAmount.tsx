import {Text, useColorScheme, StyleSheet, View} from "react-native";
import Colors from "../../constants/Colors";

interface TransactionItemAmountProps {
  income: boolean;
  amount: number;
  isRequest: boolean;
}

export default function TransactionItemAmount({income, amount, isRequest}: TransactionItemAmountProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const color = isRequest ? Colors.light.tint : income ? Colors.light.highlight : Colors.light.warning;

  return (
    <View style={ styles.amountDisplay }>
      {
        isRequest ? null : (<Text
          style={ {
            color,
            fontSize: 24,
            fontWeight: '600'
          } }
        >
          { income ? '+' : '-' }
        </Text>)
      }
      <Text
        style={ {
          color,
          fontSize: 24,
          fontWeight: '600'
        } }
      >
        { amount }
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



