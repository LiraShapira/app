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
import { useEffect, useState } from 'react';
import { StorageKeys } from '../../types/AsyncStorage';
import { getItem, setItem } from '../../utils/asyncStorage';
import { CompostStand } from '../../types/Deposit';
import { fetchCompostStands, CompostStandFromAPI } from '../../API/compostStandAPI';
import { selectUser } from '../../store/userSlice';

export default function Deposit() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const depositValue = useAppSelector(selectDepositValue);
  const isGuaranteedAccurate = useAppSelector(selectIsGuaranteedAccurate);
  const compostStand = useAppSelector(selectCompostStand);
  const [availableStands, setAvailableStands] = useState<CompostStandFromAPI[]>([]);
  const [isLoadingStands, setIsLoadingStands] = useState(true);

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
          netAmount: (parseFloat(depositValue) * 0.9).toFixed(2),
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
    
    // Fetch stands from API
    const loadStands = async () => {
      try {
        setIsLoadingStands(true);
        // Normalize locale: 'iw' is Hebrew on some devices, map it to 'he'
        const locale = (i18n.locale === 'iw' || i18n.locale === 'he') ? 'he' : (i18n.locale || 'he');
        const response = await fetchCompostStands(locale, user.communityId);
        if (response.data) {
          // Ensure displayName exists, fallback to name_he or name_en if missing
          const standsWithDisplayNames = response.data.map(stand => ({
            ...stand,
            displayName: stand.displayName || stand.name_he || stand.name_en || stand.name || 'Unknown',
          }));
          setAvailableStands(standsWithDisplayNames);
          console.log('Loaded compost stands:', standsWithDisplayNames);
        } else {
          console.error('Error loading compost stands:', response.error);
          // Fallback to empty array - user won't see any stands but app won't crash
          setAvailableStands([]);
        }
      } catch (error) {
        console.error('Error loading compost stands:', error);
        setAvailableStands([]);
      } finally {
        setIsLoadingStands(false);
      }
    };
    
    loadStands();
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

      {/* <Text
        style={{
          marginTop: 20,
          paddingTop: 10,
          paddingHorizontal: 10,
          color: Colors[colorScheme].text,
        }}
      >
        {i18n.t('deposit_choose_location')}
      </Text> */}

      <View
        style={{
          backgroundColor: Colors[colorScheme].highlight,
          borderRadius: 10,
          margin: 10,
          marginTop: 45,
          paddingHorizontal: 10,
          paddingVertical: 8,
        }}
      >
        <Picker
          selectedValue={compostStand || ''}
          onValueChange={(stand) => dispatch(setCompostStand(stand))}
          style={{
            fontSize: 18,
            height: 60,
          }}
          mode="dropdown"
          enabled={!isLoadingStands}
        >
          <Picker.Item label={i18n.t('deposit_compost_stand_blank')} value="" />
          {availableStands.map((stand) => {
            const displayName = stand.displayName || stand.name_he || stand.name_en || stand.name || 'Unknown';
            return (
              <Picker.Item
                key={stand.compostStandId}
                label={displayName}
                value={stand.name || String(stand.compostStandId)}
              />
            );
          })}
        </Picker>
      </View>
      <Text
        style={{
          fontSize: 40,
          paddingVertical: 16,
          color: Colors[colorScheme].text,
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
            disabled={!depositValue || !compostStand}
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
    paddingVertical: 20,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
    minHeight: 0,
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
    marginTop: 'auto',
  },
  submitButton: {
    borderRadius: 200,
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
