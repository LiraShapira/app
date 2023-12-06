import {
  View,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import Colors from '../../constants/Colors';
import i18n from '../../translationService';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CustomButton from '../../components/utils/CustomButton';
import { resetForm, selectValue, setAmount } from '../../store/depositFormSlice';
import { useRouter } from 'expo-router';
import NumberInputNumberPad from "../../components/form/NumberInputNumberPad";

export default function Deposit() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectValue);

  const onPressCancel = () => {
    dispatch(resetForm());
    router.replace('/Home');
  };
  const onPressContinue = () => {
    router.replace('/CompostReport');
  };

 const onChangeValue = (newVal: string) => {
   dispatch(setAmount(newVal));
 }

  return (
    <View style={{ height: '100%', padding: 8 }}>
      <Text
        style={{
          fontSize: 40,
          paddingVertical: 16,
          color: Colors[colorScheme ?? 'light'].text,
        }}
      >
        {i18n.t('deposit_title')}
      </Text>
      <View style={styles.depositSwitches}>
        <NumberInputNumberPad value={value} setValue={onChangeValue} />
        <View style={styles.buttons}>
          <CustomButton
            text={i18n.t('continue')}
            onPress={onPressContinue}
            disabled={!value}
          />
          <CustomButton text={i18n.t('cancel')} onPress={onPressCancel} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  depositSwitches: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '80%',
  },
  depositSwitchContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  amount: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'stretch',
  },
  amountLabel: { flex: 1 },
  amountInput: { flex: 1 },
  input: {
    height: 120,
    textAlignVertical: 'top',
    textAlign: 'left',
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderStyle: 'solid',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  submitButton: {
    borderRadius: 200,
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
