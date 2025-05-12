import { StyleSheet, Text, useColorScheme, View } from "react-native";
import Colors from "../../constants/Colors";
import i18n from '../../translationService';
import { Transaction } from "../../types/Transaction";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../store/userSlice";
import { User } from "../../types/User";

interface TransactionItemDescriptionProps {
  transaction: Transaction;
  income: boolean;
  isRequest: boolean;
}


export default function TransactionItemDescription({ transaction, income, isRequest }: TransactionItemDescriptionProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const isDeposit = transaction.reason === 'Deposit'
  const isStandAdminPayment = transaction.reason === 'StandAdminPayment';
  const topTextPrefix = isRequest ? i18n.t('transaction_request_to') : income ? i18n.t('transactions_list_received_from') : i18n.t('transactions_list_sent_to');
  const currentUser = useAppSelector<User>(selectUser);
  const otherUser =
    transaction.users.find(u => u.id !== currentUser.id) ||
    transaction.users[0];
  const topText = topTextPrefix + otherUser.firstName;

  return (
    <View style={{ ...styles.notesDisplay }}>
      {
        isDeposit ?
          <Text style={{ fontWeight: '600', color: Colors[colorScheme].text }}>{i18n.t('deposit')}</Text>
          :
          <Text
            style={{
              fontWeight: '600',
              color: Colors[colorScheme].text
            }}>{topText}</Text>
      }
      <Text style={{ color: Colors[colorScheme].text }}>
        {isDeposit ? i18n.t('transactions_list_compost_deposit') : isStandAdminPayment ? i18n.t('transaction_item_description_stand_admin_payment') : transaction.reason}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  notesDisplay: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
  },
});
