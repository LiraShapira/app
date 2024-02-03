import Card from '../utils/Card';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../utils/CustomButton';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { User } from '../../types/User';
import {handleRequest, loadUser, selectUser, setUser} from '../../store/userSlice';
import i18n from "../../translationService";
import { getLocales } from 'expo-localization';

export default function RequestCard() {
  const user = useAppSelector<User>(selectUser);
  const request = user.transactions.filter((t) => t.isRequest && t.recipientId !== user.id)[0];
  const dispatch = useAppDispatch();

  const  onClick = async (isRequestAccepted: boolean) => {
    const transaction = await dispatch(handleRequest({ transaction: request, isRequestAccepted }));
    dispatch(loadUser(user.phoneNumber))
      .unwrap()
      .then(({ data: user}) => {
        if (user) {
          dispatch(setUser(user));
        }
      });
  };

  return request ? (
    <Card>
      <View style={ styles.container }>
        <View style={styles.textBox}>
          <Text style={styles.name}>{ i18n.t('request_card_request_from', { name: request.users[0].firstName }) }</Text>
          <View style={{ flexDirection: 'row' }} dir={getLocales()[0].textDirection || 'ltr'}>
            <Text style={styles.number}>{request.amount}</Text>
            <Text>{i18n.t('home_lira_shapira_currency_shorthand')}</Text>
          </View>
          <Text style={styles.reason}>{request.reason}</Text>
        </View>
        <View style={styles.buttons}>
          <CustomButton
            text={i18n.t('request_card_refuse')}

            transparent
            onPress={() => {
              onClick(false);
            }}
          />
          <CustomButton
            text={i18n.t('request_card_accept')}
            onPress={() => {
              onClick(true);
            }}
          />
        </View>
      </View>
    </Card>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignContent: 'space-around',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4
  },
  textBox:  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 8
  },
  name: {
    fontSize: 18,
    fontWeight: '400',
  },
  number: {
    fontSize: 18,
    fontWeight: '600',
  },
  reason: {
    fontSize: 15,
    fontWeight: '400'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  }
})
