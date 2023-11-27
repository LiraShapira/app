import React from "react";
import { TextInput, StyleSheet, View, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import i18n from "../../translationService";
import { useAppDispatch } from "../../hooks";
import { setFirstName, setLastName } from "../../store/authFormSlice";

export default function Registration() {
  const colorScheme = useColorScheme() ?? 'light';
  const dispatch = useAppDispatch();

  return (

    <View style={{
      ...styles.fullNameInputContainer,
      backgroundColor: Colors[colorScheme].background
    }}>
      <h1>{i18n.t('main_title')}</h1>
      <h2>{i18n.t('secondary_main_title')}</h2>
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
  );
}

const styles = StyleSheet.create({
  fullNameInputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  nameInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    height: 36,
    flexBasis: '50%',
    marginHorizontal: 1,
  },
});
