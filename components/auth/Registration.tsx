import React from "react";
import { TextInput, StyleSheet, View, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import i18n from "../../translationService";
import { setFirstName, setLastName } from "../../store/authFormSlice";
import { selectCompostStand, setCompostStand } from '../../store/depositFormSlice';
import { Picker } from '@react-native-picker/picker';
import { CompostStand } from '../../types/Deposit';
import { useAppDispatch, useAppSelector } from '../../hooks';

export default function Registration() {
  const selectedCompostStand = useAppSelector(selectCompostStand);
  const colorScheme = useColorScheme() ?? 'light';
  const dispatch = useAppDispatch();

  return (
    <View style={{
      ...styles.container,
      backgroundColor: Colors[colorScheme].background
    }}>
      <View style={styles.row}>
        <TextInput
          style={{
            color: Colors[colorScheme].text,
            borderBottomColor: Colors[colorScheme].text,
            ...styles.nameInput,
          }}
          onChangeText={(t) => dispatch(setFirstName(t))}
          placeholder={i18n.t('auth_first_name')}
          placeholderTextColor={Colors[colorScheme].shading}
        />
        <TextInput
          style={{
            ...styles.nameInput,
            color: Colors[colorScheme].text,
            borderBottomColor: Colors[colorScheme].text,
          }}
          placeholder={i18n.t('auth_last_name')}
          onChangeText={(t) => dispatch(setLastName(t))}
          placeholderTextColor={Colors[colorScheme].shading}
        />
      </View>
      <Picker
        selectedValue={selectedCompostStand}
        onValueChange={(stand: CompostStand) => dispatch(setCompostStand(stand))}
        style={styles.picker}
      >
        {Object.keys(CompostStand).map((stand) => (
          <Picker.Item key={stand} label={i18n.t(`deposit_compost_stand_${stand}`)} value={stand} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  nameInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    height: 36,
    flexBasis: '70%',
    marginHorizontal: 1,
    marginTop: 5,
  },
  picker: {
    borderStyle: 'solid',
    borderWidth: 1,
    height: 56,
    width: '100%', 
    marginHorizontal: 1,
    marginTop: 5,
  },
});
