import { Text, TextInput, View, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';
import i18n from '../translationService';
import { useAppDispatch } from '../hooks';
import { setGuaranteedAccurate } from '../store/depositFormSlice';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const DepositFormCheckBox = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const dispatch = useAppDispatch();

  const onChange = (isChecked: boolean) => {
    dispatch(setGuaranteedAccurate(isChecked));
  };

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <BouncyCheckbox fillColor={Colors[colorScheme].highlight} onPress={onChange} />
      <Text
        style={{
          color: Colors[colorScheme].text,
        }}
      >
        {i18n.t('deposit_modal_agree_checkbox')}
      </Text>
    </View>
  );
};

export default DepositFormCheckBox;
