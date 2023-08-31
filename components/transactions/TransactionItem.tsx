import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import { Transaction } from '../../types/Transaction';
import Colors from '../../constants/Colors';
import { monthsLongForm } from '../../constants/Months';
import i18n from '../../translationService';

interface TransactionItemProps {
  income: boolean;
  transaction: Transaction;
}

export default function TransactionItem({
  income,
  transaction,
}: TransactionItemProps) {
  const colorScheme = useColorScheme();
  const month = monthsLongForm[new Date(transaction.createdAt).getMonth()];
  return (
    <View>
      <View style={styles.transactionItem}>
        <View style={styles.dateDisplay}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 25,
              color: Colors[colorScheme ?? 'light'].text,
            }}
          >
            {new Date(transaction.createdAt).getDay()}
          </Text>
          <Text
            style={{
              color: Colors[colorScheme ?? 'light'].text,
            }}
          >
            {i18n.t(`month_${month}_MMM`)}
          </Text>
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
      <View
        style={{
          borderColor: Colors[colorScheme ?? 'light'].shading,
          ...styles.divider,
        }}
      />
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
    display: 'flex',
    flexDirection: 'row',
  },
  divider: {
    width: '100%',
    padding: 12,
    borderBottomWidth: 1,
  },
});
