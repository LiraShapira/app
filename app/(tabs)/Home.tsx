import { StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import TransactionsList from '../../components/transactions/TransactionsList';
import Dashboard from '../../components/home/Dashboard';
import i18n from '../../translationService';
import { selectUser } from '../../store/userSlice';
import { useAppSelector } from '../../hooks';

export default function Home() {
  const colorScheme = useColorScheme();
  const user = useAppSelector(selectUser);

  return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: Colors[colorScheme ?? 'light'].shading,
            width: '100%',
          }}
        >
          <Dashboard />
        </View>
        <View style={styles.transactionList}>
          <Text style={{ fontSize: 40 }}>
            {i18n.t('home_transactions_title')}
          </Text>
          <TransactionsList currentUser={user} />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'grey',
    borderRadius: 50,
    fontSize: 40,
  },
  transactionList: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
