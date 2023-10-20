import { StyleSheet, TextInput, useColorScheme } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import TransactionsList from '../components/transactions/TransactionsList';
import Dashboard from '../components/home/Dashboard';
import i18n from '../translationService';
import { selectUser } from '../store/userSlice';
import { useAppDispatch, useAppSelector, useMultiAppSelectors } from '../hooks';
import { selectFirstName, selectLastName, selectPhoneNumber, sendAuthForm, setFirstName, setLastName, setPhoneNumber } from '../store/authFormSlice';
import { useCallback } from 'react';
import CustomButton from '../components/utils/CustomButton';

const useRegistrationForm = () => {
  const dispatch = useAppDispatch();
  const firstName = useAppSelector(selectFirstName);
  const lastName = useAppSelector(selectLastName);
  const phoneNumber = useAppSelector(selectPhoneNumber);
  // const [firstName, lastName, phoneNumber] = useMultiAppSelectors([
  //   selectFirstName,
  //   selectLastName,
  //   selectPhoneNumber,
  // ]);

  console.log({
    firstName,
    lastName,
    phoneNumber,
  })

  return {
    firstName,
    lastName,
    phoneNumber,
    setFirstName: (firstName: string) => dispatch(setFirstName(firstName)),
    setLastName: (lastName: string) => dispatch(setLastName(lastName)),
    setPhoneNumber: (phoneNumber: string) => dispatch(setPhoneNumber(phoneNumber)),
    onSubmit: () => dispatch(sendAuthForm())
  }
}

export default function Auth() {
  console.log("re-rendering")
  const colorScheme = useColorScheme() ?? 'light';
  const {
    firstName,
    lastName,
    phoneNumber,
    setFirstName,
    setLastName,
    setPhoneNumber,
    onSubmit,
  } = useRegistrationForm();
  console.log({firstName})

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Colors[colorScheme].shading,
          width: '90%',
        }}
      >
              <View>
        <Text style={{ fontSize: 40 }}>
          AUTH
        </Text>
      </View>
        <View style={styles.fullNameInputContainer}>
          <TextInput
            style={{
              color: Colors[colorScheme].text,
              borderStyle: 'solid',
              borderBottomColor: Colors[colorScheme].text,
              borderWidth: 1,
              paddingHorizontal: 4,
              height: 36,
              flexBasis: "50%",
              marginHorizontal: 1,
              alignSelf: 'center', 
            }}
            
            onChangeText={setFirstName}
            placeholder={'First Name'}
            placeholderTextColor={Colors[colorScheme].shading}
          ></TextInput>
          <TextInput
            style={{
              color: Colors[colorScheme].text,
              borderStyle: 'solid',
              borderWidth: 1,
              height: 36,
              borderBottomColor: Colors[colorScheme].text,
              
              flexBasis: "50%",
              marginHorizontal: 1,
            }}
            placeholder={'Last Name'}
            // value={lastName}
            onChangeText={setLastName}
            placeholderTextColor={Colors[colorScheme].shading}
          ></TextInput>
        </View>
        <TextInput
          style={{
            color: Colors[colorScheme].text,
            borderStyle: 'solid',
            marginTop: 4,
            borderBottomColor: Colors[colorScheme].text,
            borderWidth: 1,
            paddingHorizontal: 4,
            height: 36,
            marginHorizontal: 1,
            width: '100%',
            alignSelf: 'center', // Center the TextInput element horizontally
          }}
          placeholder={'Phone Number'}
          placeholderTextColor={Colors[colorScheme].shading}
          // value={phoneNumber}
          onChangeText={setPhoneNumber}
        ></TextInput>
        <CustomButton text='Submit' onPress={onSubmit} style={styles.submit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center"
  },
  fullNameInputContainer: {
    flexDirection: "row",
  },
  submit: {
    marginTop: 7
  }
});
