import { View, Text, useColorScheme } from 'react-native';
import { mockTransactions } from '../Mocks/mockDB';
import { Transaction } from '../types/Transaction';
import Colors from '../constants/Colors';

export default function TransactionsList() {
  const colorScheme = useColorScheme();

  return (
    <View>
      {mockTransactions.map((t: Transaction, i) => (
        <Text
          style={{ color: Colors[colorScheme ?? 'light'].text }}
          key={`${i}${t.date}`}
        >
          {t.amount}
        </Text>
      ))}
    </View>
  );
}

// const styles = StyleSheet.create({});
//
