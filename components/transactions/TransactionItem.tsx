import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import { Transaction } from '../../types/Transaction';
import Colors from '../../constants/Colors';

interface TransactionItemProps {
  income: boolean;
  transaction: Transaction;
}

export default function TransactionItem({
  income,
  transaction,
}: TransactionItemProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.transactionItem}>
      <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
        {transaction.date.toLocaleDateString()}
      </Text>
      <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
        {income ? '+' : '-'}
      </Text>
      <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
        {transaction.amount}
      </Text>
      <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
        {transaction.reason}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    textAlign: 'center',
  },
});
