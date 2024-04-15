import { Text, View, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';
import i18n from '../translationService';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../hooks';
import { setGuaranteedAccurate } from '../store/depositFormSlice';

const DepositFormCheckBox = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setGuaranteedAccurate(e.target.checked));
  };

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <input onChange={onChange} type='checkbox'></input>
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
