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
import { setItem } from '../../utils/asyncStorage';
import { CompostStand } from '../../types/Deposit';

export default function Deposit() {
  const colorScheme = useColorScheme() ?? 'light';
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
    if (!compostStand || !depositValue) {
      return;
    }
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
    // Reset compost stand to blank when component mounts
    dispatch(setCompostStand('' as CompostStand));
  }, []);

  const selectedStandLabel = compostStand
    ? i18n.t(`deposit_compost_stand_${compostStand}`)
    : i18n.t('deposit_compost_stand_blank');

  return (
    <GradientContainer styles={styles.container} safeAreaStyle={{ flex: 1 }}>
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

      <View style={styles.contentContainer}>
        {/* 1. Select at the top */}
        <View style={styles.selectSection}>
          <Text style={[styles.selectLabel, { color: Colors[colorScheme].text }]}>
            {i18n.t('deposit_choose_location')}
          </Text>
          <View style={[styles.pickerWrapper, { backgroundColor: Colors[colorScheme].highlight }]}>
            <Text
              style={[styles.pickerText, { color: Colors[colorScheme].text }]}
              numberOfLines={1}
            >
              {selectedStandLabel}
            </Text>
            <Picker
              selectedValue={compostStand || ''}
              onValueChange={(stand) => dispatch(setCompostStand(stand))}
              style={styles.picker}
              mode="dropdown"
              dropdownIconColor={Colors[colorScheme].text}
            >
              <Picker.Item label={i18n.t('deposit_compost_stand_blank')} value="" />
              {compostStands.map((stand) => (
                <Picker.Item
                  key={stand}
                  label={i18n.t(`deposit_compost_stand_${stand}`)}
                  value={stand}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* 2. Title */}
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
          {i18n.t('deposit_title')}
        </Text>

        {/* 3. Input field and number pad */}
        <View style={styles.numberPadContainer}>
          <NumberInputNumberPad
            onButtonPress={onPressNumberPadInput}
            appendedText={i18n.t('deposit_form_kilogram')}
            value={depositValue}
          />
        </View>

        {/* Spacer to push buttons to bottom is handled by marginTop 'auto' on buttonsSection */}

        {/* 4. Buttons at the bottom */}
        <View style={styles.buttonsSection}>
          <CustomButton
            text={i18n.t('continue')}
            onPress={onPressContinue}
            disabled={!depositValue || !compostStand}
          />
          <CustomButton
            transparent={true}
            text={i18n.t('cancel')}
            onPress={onPressCancel}
            textColor='white'
          />
        </View>
      </View>
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 40,
    paddingBottom: 80, // Increased to ensure buttons are visible above footer
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    paddingBottom: 4,
    paddingHorizontal: 4,
    textAlign: 'left',
  },
  selectSection: {
    marginBottom: 10,
  },
  selectLabel: {
    fontSize: 14,
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  pickerWrapper: {
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 12,
    position: 'relative',
  },
  pickerText: {
    fontSize: 16,
    position: 'absolute',
    left: 12,
    right: 40,
  },
  picker: {
    opacity: 0.01,
    height: 50,
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10, // Ensure it sits on top for touch events
    elevation: 10,
  },
  numberPadContainer: {
    // Explicit width to ensure children with aspectRatio have a base dimension
    width: '90%',
    alignSelf: 'center',
  },
  buttonsSection: {
    marginTop: 'auto', // Pushes to the bottom
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12, // ensure clearance from tab bar
  },
});
