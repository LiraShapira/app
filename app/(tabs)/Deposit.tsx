import {
  View,
  StyleSheet,
  Text,
  useColorScheme,
  Platform,
  Modal,
  Pressable,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
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
import { useState, useEffect } from 'react';
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
  const [isSelectionModalVisible, setSelectionModalVisible] = useState(false);

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

  const onSelectStand = (stand: CompostStand) => {
    dispatch(setCompostStand(stand));
    setSelectionModalVisible(false);
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

      {/* Stand Selection Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSelectionModalVisible}
        onRequestClose={() => setSelectionModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setSelectionModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { backgroundColor: Colors[colorScheme].background }]}>
                <Text style={[styles.modalTitle, { color: Colors[colorScheme].text }]}>
                  {i18n.t('deposit_choose_location')}
                </Text>
                <FlatList
                  data={compostStands}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <Pressable
                      style={({ pressed }) => [
                        styles.modalOption,
                        pressed && styles.modalOptionPressed,
                        item === compostStand && { backgroundColor: Colors[colorScheme].tint + '20' },
                      ]}
                      onPress={() => onSelectStand(item)}
                    >
                      <Text style={[styles.modalOptionText, { color: Colors[colorScheme].text }]}>
                        {i18n.t(`deposit_compost_stand_${item}`)}
                      </Text>
                    </Pressable>
                  )}
                  style={{ maxHeight: 300 }}
                />
                <CustomButton
                  text={i18n.t('cancel')}
                  onPress={() => setSelectionModalVisible(false)}
                  transparent={true}
                  style={{ marginTop: 10 }}
                  textColor='white'
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.contentContainer}>
        {/* 1. Select at the top */}
        <View style={styles.selectSection}>
          <Text style={[styles.selectLabel, { color: Colors[colorScheme].text }]}>
            {i18n.t('deposit_choose_location')}
          </Text>
          <Pressable
            style={[styles.pickerWrapper, { backgroundColor: Colors[colorScheme].highlight }]}
            onPress={() => setSelectionModalVisible(true)}
          >
            <Text
              style={[styles.pickerText, { color: Colors[colorScheme].text }]}
              numberOfLines={1}
            >
              {selectedStandLabel}
            </Text>
          </Pressable>
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
    zIndex: 20, // Ensure overlay sits on top of specific content
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
    zIndex: 20, // Ensure touch events are captured
  },
  pickerText: {
    fontSize: 16,
    // aligned left by default in wrapper justifyContent
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%',
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  modalOptionPressed: {
    opacity: 0.5,
  },
  modalOptionText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
