import * as Contacts from 'expo-contacts';
import { mockContacts } from '../Mocks/mockDB';

export function fetchContacts(): Promise<Contacts.Contact[]> {
    return new Promise<Contacts.Contact[]>(async resolve => {
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
      } else {
        resolve(mockContacts);
      }
    });
  }