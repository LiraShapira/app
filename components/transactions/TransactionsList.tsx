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
    <View>
      {mockTransactions.map((transaction: Transaction, i) => (
        <View key={`${i}${transaction.date}`} style={styles.transactionList}>
          <TransactionItem
            transaction={transaction}
            income={transaction.recipientUserID === currentUser.userID}
          ></TransactionItem>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  transactionList: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    textAlign: 'center',
    width: '100%',
  },
});
