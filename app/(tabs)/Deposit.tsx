import { View, StyleSheet, Text, useColorScheme, Platform } from 'react-native';
import Colors from '../../constants/Colors';
import i18n from '../../translationService';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CustomButton from '../../components/utils/CustomButton';
import {
  resetForm,
  selectIsGuaranteedAccurate,
  selectDepositValue,
  setAmount,
  setGuaranteedAccurate,
  selectCompostStand,
  setCompostStand,
} from '../../store/depositFormSlice';
import { useRouter } from 'expo-router';
import NumberInputNumberPad, {
  NumberLabel,
} from '../../components/form/NumberInputNumberPad';
import GradientContainer from '../../components/utils/GradientContainer';
import { CustomModal } from '../../components/utils/CustomModal';
import { setIsModalVisible, setModalText } from '../../store/appStateSlice';
import DepositFormCheckBox from '../../components/DepositFormCheckbox';
import { parseNumberPadInputForDeposit } from '../../utils/functions';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import { compostStands } from '../../utils/compostStands';
import { StorageKeys } from '../../types/AsyncStorage';
import { getItem, setItem } from '../../utils/asyncStorage';

export default function Deposit() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const depositValue = useAppSelector(selectDepositValue);
  const isGuaranteedAccurate = useAppSelector(selectIsGuaranteedAccurate);
  const compostStand = useAppSelector(selectCompostStand);

  const onPressCancel = () => {
    dispatch(resetForm());
    router.replace('/Home');
  };
  const onPressContinue = () => {
    setItem(StorageKeys.compostStand, compostStand);

    dispatch(
      setModalText(
        `${i18n.t('deposit_modal_amount', { amount: depositValue })}
        ${i18n.t('deposit_modal_stand_manager')}
        ${i18n.t('deposit_modal_you_earn', {
          netAmount: parseFloat(depositValue) * 0.9,
        })}
        `
      )
    );
    dispatch(setGuaranteedAccurate(false));
    dispatch(setIsModalVisible(true));
  };

  const onPressModal = () => {
    dispatch(setIsModalVisible(false));
    router.replace('/CompostReport');
  };

  const onPressModalCorrect = () => {
    dispatch(setIsModalVisible(false));
    dispatch(setGuaranteedAccurate(false));
  };
  const onPressNumberPadInput = (n: NumberLabel) => {
    const newValue = parseNumberPadInputForDeposit(n, depositValue);
    // NB! conditional on false required because 0 falsy value
    if (newValue !== false) {
      dispatch(setAmount(newValue));
    }
  };

  useEffect(() => {
    getItem(StorageKeys.compostStand).then((stand) => {
      if (stand) dispatch(setCompostStand(stand));
    });
  }, []);

  return (
    <GradientContainer>
      <CustomModal
        buttons={[
          {
            text: i18n.t('deposit_modal_button_correct'),
            onPress: onPressModalCorrect,
          },
          {
            text: i18n.t('deposit_modal_button_finish'),
            onPress: onPressModal,
            disabled: !isGuaranteedAccurate,
          },
        ]}
        customElement={<DepositFormCheckBox />}
      />
      <Picker
        style={{
          borderRadius: 10,
          margin: 10,
          padding: 5,
          fontSize: 14,
        }}
        selectedValue={compostStand}
        onValueChange={(stand) => dispatch(setCompostStand(stand))}
      >
        {compostStands.map((stand) => (
          <Picker.Item
            key={stand}
            label={i18n.t(`deposit_compost_stand_${stand}`)}
            value={stand}
          />
        ))}
      </Picker>
      <Text
        style={{
          fontSize: 40,
          paddingVertical: 16,
          color: Colors[colorScheme ?? 'light'].text,
          fontWeight: 700,
        }}
      >
        {i18n.t('deposit_title')}
      </Text>
      <View style={styles.depositSwitches}>
        <NumberInputNumberPad
          onButtonPress={onPressNumberPadInput}
          appendedText={i18n.t('deposit_form_kilogram')}
          value={depositValue}
        />
        <View style={styles.buttons}>
          <CustomButton
            text={i18n.t('continue')}
            onPress={onPressContinue}
            disabled={!depositValue}
          />
          <CustomButton
            transparent={true}
            text={i18n.t('cancel')}
            onPress={onPressCancel}
          />
        </View>
      </View>
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  container: { height: '100%', padding: 8 },
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
