import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Dimensions,
} from 'react-native';
import DashboardButton from './DashboardButton';
import Colors from '../../constants/Colors';
import i18n from '../../translationService';
import { selectUser } from '../../store/userSlice';
import { useAppSelector } from '../../hooks';
import { IconLibrary } from '../../types/Icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Category, Transaction } from '../../types/Transaction';

const ButtonGroup = () => {
  const colorScheme = useColorScheme();

  return (
    <View style={{ position: 'relative', zIndex: 1 }}>
      <View style={styles.buttonsContainer}>
        <View style={styles.labeledButton}>
          <DashboardButton
            route='/Deposit'
            iconName='deposit_icon'
            iconLibraryName={IconLibrary.Local}
          />
          <Text
            style={{
              ...styles.buttonLabel,
              color: Colors[colorScheme ?? 'light'].text,
            }}
          >
            {i18n.t('deposit')}
          </Text>
        </View>
        <View style={styles.labeledButton}>
          <DashboardButton
            route='/Send'
            params={{ isRequest: true }}
            iconName='request_icon_with_circle'
            iconLibraryName={IconLibrary.Local}
          />
          <Text
            style={{
              ...styles.buttonLabel,
              color: Colors[colorScheme ?? 'light'].text,
            }}
          >
            {i18n.t('dashboard_dashboard_buttons_request')}
          </Text>
        </View>
        <View style={styles.labeledButton}>
          <DashboardButton
            route='/Send'
            iconName='send_icon_with_circle'
            iconLibraryName={IconLibrary.Local}
          />
          <Text
            style={{
              ...styles.buttonLabel,
              color: Colors[colorScheme ?? 'light'].text,
            }}
          >
            {i18n.t('dashboard_dashboard_buttons_send')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const calculateGarbagePrevented = (transactionHistory = []) => {
  const sumDeposits = transactionHistory.reduce((acc, item: Transaction) => {
    return item?.category in Category &&
      item?.category.toLocaleLowerCase() === 'deposit'
      ? acc + parseFloat(item?.amount + '')
      : acc;
  }, 0);

  return parseFloat(sumDeposits + '').toFixed(2);
};
export default function Dashboard() {
  const colorScheme = useColorScheme();
  const user = useAppSelector(selectUser);
  console.log('dashboard ');
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text
          style={{
            color: Colors[colorScheme ?? 'light'].text,
            ...styles.nameLabel,
          }}
        >
  {i18n.t('dashboard_greeting_message', { name: user.firstName })}
  </Text>
        <Text style={styles.hamburgerMenu}>
          <FontAwesome name='bars' size={30} color='black' />
        </Text>
      </View>

      <View style={styles.dashboard}>
        <Text
          style={{
            color: Colors[colorScheme ?? 'light'].text,
            ...styles.subtitle,
          }}
        >
          {i18n.t('home_lira_shapira_currency_you_have')}
        </Text>
        <View style={styles.amountDisplay}>
          <Text
            style={{
              color: Colors[colorScheme ?? 'light'].text,
              ...styles.title,
            }}
          >
            {user.accountBalance.toFixed(1)}
          </Text>
          <Text
            style={{ color: Colors[colorScheme ?? 'light'].text, ...styles.LS }}
          >
            {i18n.t('home_lira_shapira_currency_shorthand')}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: Colors[colorScheme ?? 'light'].text,
          ...styles.co2eText,
        }}
      >
        {i18n.t('dashboard_You_have_prevented_kilos_of_garbage', {
          kilos: calculateGarbagePrevented(user.transactions ?? []),
        })}
        <FontAwesome name='truck' size={30} color='#e1a6a6' />
      </Text>
      <ButtonGroup />
    </View>
  );
}
const styles = StyleSheet.create({
  dashboard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 10,
  },
  amountDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    margin: 10,
  },
  labeledButton: {
    flexDirection: 'column',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  shadowPhantom: {
    shadowColor: '#272424',
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 50,
    height: 70,
    width: 68,
    top: -10,
    position: 'absolute',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    top: 60,
    gap: 16,
    zIndex: 2,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  co2eText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 500,
    gap: 10,
  },
  LS: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 500,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  nameLabel: {
    fontSize: 18,
    textAlign: 'center',
    flex: 2,
  },
  hamburgerMenu: {},
});
