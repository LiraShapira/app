import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import { Transaction } from '../../types/Transaction';
import Colors from '../../constants/Colors';
import { monthsShortForm } from '../../constants/Months';

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
      <View style={styles.dateDisplay}>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 25,
            color: Colors[colorScheme ?? 'light'].text,
          }}
        >
          {transaction.date.getDay()}
        </Text>
        <Text style={{}}>{monthsShortForm[transaction.date.getMonth()]}</Text>
      </View>
      <View style={styles.notesDisplay}>
        <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
          {transaction.reason}
        </Text>
      </View>
      <View style={styles.amountDisplay}>
        <Text
          style={{
            fontSize: 20,
            color: Colors[colorScheme ?? 'light'].text,
          }}
        >
          {income ? '+' : '-'}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: Colors[colorScheme ?? 'light'].text,
          }}
        >
          {transaction.amount}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    textAlign: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dateDisplay: {
    // flex: 2,
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  amountDisplay: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'right',
    alignItems: 'flex-start',
    fontWeight: '400',
    fontSize: '40',
  },
  notesDisplay: {
    width: '60%',
    // flexGrow: 4,
    display: 'flex',
    flexDirection: 'row',
  },
});
