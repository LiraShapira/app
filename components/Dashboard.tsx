import { View, Text, StyleSheet } from 'react-native';
import { mockUser } from '../Mocks/mockDB';
import DashboardButton from './home/DashboardButton';

export default function Dashboard() {
  return (
    <View style={styles.dashboard}>
      <Text style={styles.subtitle}>You Have:</Text>
      <Text style={styles.title}>{mockUser.accountBalance}</Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.labeledButton}>
          <DashboardButton iconName='scan-circle' iconLibrary='Ionicons' />
          <Text style={{ textAlign: 'center' }}>Scan</Text>
        </View>
        <View style={styles.labeledButton}>
          <DashboardButton
            iconName='hand-coin-outline'
            iconLibrary='MaterialCommunityIcons'
          />
          <Text style={{ textAlign: 'center' }}>Request</Text>
        </View>
        <View style={styles.labeledButton}>
          <DashboardButton iconName='paper-plane' iconLibrary='FontAwesome' />
          <Text style={{ textAlign: 'center' }}>Send</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  dashboard: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    width: '100%',
  },
  labeledButton: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
