import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import TransactionsList from '../../components/transactions/TransactionsList';
import Dashboard from '../../components/home/Dashboard';
import i18n from '../../translationService';
import { selectUser } from '../../store/userSlice';
import { useAppSelector } from '../../hooks';
import GradientContainer from '../../components/utils/GradientContainer';
import RequestCard from '../../components/requests/RequestCard';
import { User } from '../../types/User';

export default function Home() {
  const user = useAppSelector<User>(selectUser);
  return (
    <View style={styles.container}>
      <GradientContainer styles={{ height:  'auto' }}>
        <Dashboard />
      </GradientContainer>

      <View
        style={{
          paddingTop: 75,
          paddingBottom: 10,
          zIndex: -1,
          width: '100%',
          position: 'relative',
          height: 'auto',
        }}
      >
        <RequestCard />
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
  dashboardContainer: {
    width: '100%',
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
