import {
  View,
  StyleSheet,
  Text,
  useColorScheme,
  Modal,
  Pressable,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
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
import { StorageKeys } from '../../types/AsyncStorage';
import { setItem } from '../../utils/asyncStorage';
import { CompostStand } from '../../types/Deposit';
import { fetchCompostStands, CompostStandFromAPI } from '../../API/compostStandAPI';
import { selectUser } from '../../store/userSlice';

const TAB_BAR_SAFE_BOTTOM = 88;

export default function Deposit() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const depositValue = useAppSelector(selectDepositValue);
  const isGuaranteedAccurate = useAppSelector(selectIsGuaranteedAccurate);
  const compostStand = useAppSelector(selectCompostStand);
  const [isSelectionModalVisible, setSelectionModalVisible] = useState(false);
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
    if (newValue !== false) {
      dispatch(setAmount(newValue));
    }
  };

  const onSelectStand = (stand: CompostStand) => {
    dispatch(setCompostStand(stand));
    setSelectionModalVisible(false);
  };

  useEffect(() => {
    dispatch(setCompostStand('' as CompostStand));

    const loadStands = async () => {
      try {
        setIsLoadingStands(true);
        const locale = (i18n.locale === 'iw' || i18n.locale === 'he') ? 'he' : (i18n.locale || 'he');
        const response = await fetchCompostStands(locale, user.communityId);
        if (response.data) {
          const standsWithDisplayNames = response.data.map(stand => ({
            ...stand,
            displayName: stand.displayName || stand.name_he || stand.name_en || stand.name || 'Unknown',
          }));
          setAvailableStands(standsWithDisplayNames);
        } else {
          console.error('Error loading compost stands:', response.error);
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
  }, [user.communityId, dispatch]);

  const selectedStand = availableStands.find(
    (s) => (s.name || String(s.compostStandId)) === compostStand
  );
  const selectedStandLabel = selectedStand
    ? (selectedStand.displayName || selectedStand.name_he || selectedStand.name_en || selectedStand.name)
    : isLoadingStands
      ? i18n.t('deposit_compost_stand_blank')
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
                  data={availableStands}
                  keyExtractor={(item) => String(item.compostStandId)}
                  renderItem={({ item }) => {
                    const standValue = (item.name || String(item.compostStandId)) as CompostStand;
                    const displayName = item.displayName || item.name_he || item.name_en || item.name || 'Unknown';
                    return (
                      <Pressable
                        style={({ pressed }) => [
                          styles.modalOption,
                          pressed && styles.modalOptionPressed,
                          standValue === compostStand && { backgroundColor: Colors[colorScheme].tint + '20' },
                        ]}
                        onPress={() => onSelectStand(standValue)}
                      >
                        <Text style={[styles.modalOptionText, { color: Colors[colorScheme].text }]}>
                          {displayName}
                        </Text>
                      </Pressable>
                    );
                  }}
                  style={{ maxHeight: 300 }}
                  ListEmptyComponent={
                    !isLoadingStands ? (
                      <Text style={[styles.modalOptionText, { color: Colors[colorScheme].text }]}>
                        {i18n.t('deposit_compost_stand_blank')}
                      </Text>
                    ) : null
                  }
                />
                <CustomButton
                  text={i18n.t('cancel')}
                  onPress={() => setSelectionModalVisible(false)}
                  transparent={true}
                  textColor='white'
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.selectSection}>
            <Text style={[styles.selectLabel, { color: Colors[colorScheme].text }]}>
              {i18n.t('deposit_choose_location')}
            </Text>
            <Pressable
              style={[styles.pickerWrapper, { backgroundColor: Colors[colorScheme].highlight }]}
              onPress={() => !isLoadingStands && setSelectionModalVisible(true)}
              disabled={isLoadingStands}
            >
              <Text
                style={[styles.pickerText, { color: Colors[colorScheme].text }]}
                numberOfLines={1}
                maxFontSizeMultiplier={1.0}
              >
                {selectedStandLabel}
              </Text>
            </Pressable>
          </View>

          <Text
            maxFontSizeMultiplier={1.0}
            style={[styles.title, { color: Colors[colorScheme].text }]}
          >
            {i18n.t('deposit_title')}
          </Text>

          <View style={styles.numberPadContainer}>
            <NumberInputNumberPad
              onButtonPress={onPressNumberPadInput}
              appendedText={i18n.t('deposit_form_kilogram')}
              value={depositValue}
            />
          </View>

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
      </ScrollView>
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: TAB_BAR_SAFE_BOTTOM,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 40,
    paddingBottom: 20,
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
    zIndex: 20,
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
    zIndex: 20,
  },
  pickerText: {
    fontSize: 16,
  },
  numberPadContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  buttonsSection: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
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
