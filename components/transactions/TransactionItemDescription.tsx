import {StyleSheet, Text, useColorScheme, View} from "react-native";
import Colors from "../../constants/Colors";
import i18n from '../../translationService';
import {Transaction} from "../../types/Transaction";

interface TransactionItemDescriptionProps {
  transaction: Transaction;
  income: boolean;
}


export default function TransactionItemDescription({transaction, income}: TransactionItemDescriptionProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const isDeposit = transaction.reason === 'Deposit'

  return (
      <View style={{...styles.notesDisplay}}>
        {
          isDeposit ?
              <Text style={{fontWeight: '600', color: Colors[colorScheme].text}}>{i18n.t('deposit')}</Text>
              :
              income ?
                  <Text
                      style={{
                        fontWeight: '600',
                        color: Colors[colorScheme].text
                      }}>{i18n.t('transactions_list_received_from') + transaction.users[0].firstName}</Text>
                  :
                  <Text
                      style={{
                        fontWeight: '600',
                        color: Colors[colorScheme].text
                      }}>{i18n.t('transactions_list_sent_to') + transaction.users[0].firstName}</Text>

        }
        <Text style={{color: Colors[colorScheme].text}}>
          {isDeposit ? i18n.t('transactions_list_compost_deposit') : transaction.reason}
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
