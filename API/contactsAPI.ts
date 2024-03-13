import { Platform } from 'react-native';
import * as Contacts from 'expo-contacts';
import { mockContacts } from '../Mocks/mockDB';


export function fetchContacts(): Promise<Contacts.Contact[]> {
  return new Promise<Contacts.Contact[]>(async resolve => {
    if (Platform.OS === "web") resolve(mockContacts)
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.FirstName,
          Contacts.Fields.LastName,
          Contacts.Fields.PhoneNumbers,
        ],
      });
      resolve(data);
    }
  });
}
