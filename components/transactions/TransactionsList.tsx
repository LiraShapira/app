import { View, StyleSheet } from 'react-native';
import { mockTransactions } from '../../Mocks/mockDB';
import { Transaction } from '../../types/Transaction';
import { User } from '../../types/User';
import TransactionItem from './TransactionItem';

interface TransactionsListProps {
  currentUser: User;
}

export default function TransactionsList({
  currentUser,
}: TransactionsListProps) {
  return (
    <View style={styles.transactionList}>
      {mockTransactions.map((transaction: Transaction, i) => (
        <View key={`${i}${transaction.date}`} style={styles.transactionItem}>
          <TransactionItem
            transaction={transaction}
            income={transaction.recipientUserID === currentUser.userID}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  transactionList: {
    paddingVertical: 8,
  },
  transactionItem: {
    display: 'flex',
    gap: 5,
    textAlign: 'center',
    width: '90%',
    paddingHorizontal: 4,
  },
});
