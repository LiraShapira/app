import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import { Transaction } from '../../types/Transaction';
import Colors from '../../constants/Colors';
import { monthsLongForm } from '../../constants/Dates';
import i18n from '../../translationService';
import { useMemo } from 'react';
import TransactionItemAmount from './TransactionItemAmount';
import TransactionItemDescription from './TransactionItemDescription';

interface TransactionItemProps {
  income: boolean;
  transaction: Transaction;
  isRequest: boolean;
}

export default function TransactionItem({
  income,
  isRequest,
  transaction,
}: TransactionItemProps) {
  const colorScheme = useColorScheme();

  const [day, month] = useMemo(() => {
    const date = new Date(transaction.createdAt);
    return [date.getDate(), monthsLongForm[date.getMonth()]];
  }, [transaction.createdAt]);

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
            {day}
          </Text>
          <Text
            style={{
              color: Colors[colorScheme ?? 'light'].text,
            }}
          >
            {i18n.t(`month_${month}_MMM`)}
          </Text>
        </View>
        <TransactionItemDescription
          isRequest={isRequest}
          income={income}
          transaction={transaction}
        />
        <TransactionItemAmount
          isRequest={isRequest}
          income={income}
          amount={transaction.amount}
        />
      </View>
      <View
        style={{
          borderColor: Colors[colorScheme].shading,
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
    borderBottomWidth: 2,
    marginVertical: 12,
    opacity: 0.5,
  },
});
