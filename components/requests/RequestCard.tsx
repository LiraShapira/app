import Card from '../utils/Card';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../utils/CustomButton';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { User } from '../../types/User';
import {
  handleRequest,
  loadUser,
  selectUser,
  setUser,
} from '../../store/userSlice';
import i18n from '../../translationService';
import { getLocales } from 'expo-localization';

export default function RequestCard() {
  const currentUser = useAppSelector<User>(selectUser);
  const request = currentUser.transactions.filter(
    (t) => t.isRequest && t.recipientId !== currentUser.id
  )[0];
  const dispatch = useAppDispatch();
  const userId = currentUser.id;
  const onClick = async (isRequestAccepted: boolean) => {
    const transaction = await dispatch(
      handleRequest({ transaction: request, isRequestAccepted })
    );
    dispatch(loadUser(currentUser.phoneNumber))
      .unwrap()
      .then(({ data: user }) => {
        if (user) {
          dispatch(setUser(user));
        }
      });
  };
  return request ? (
    <Card>
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.name}>
            {i18n.t('request_card_request_from', {
              name: request.users.find((u) => u.id === request.recipientId)?.firstName,
            })}
          </Text>
          <View
            style={{ flexDirection: 'row' }}
            dir={getLocales()[0].textDirection || 'ltr'}
          >
            <Text style={styles.number}>{request.amount}</Text>
            <Text>{i18n.t('home_lira_shapira_currency_shorthand')}</Text>
          </View>
          <Text style={styles.reason}>{request.reason}</Text>
        </View>

        <View style={styles.buttomContainer}>
          <View style={styles.refusButton}>
            <CustomButton
              text={i18n.t('request_card_refuse')}
              transparent
              onPress={() => {
                onClick(false);
              }}
            />
          </View>
          <View style={styles.acceptButton}>
            <CustomButton
              text={i18n.t('request_card_accept')}
              onPress={() => {
                onClick(true);
              }}
            />
          </View>
        </View>
      </View>
    </Card>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignContent: 'space-around',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  number: {
    fontSize: 18,
    fontWeight: '600',
    margin: 2,
  },
  reason: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 10,
  },
  buttomContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  refusButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButton: {
    width: '85%',
  },
});
