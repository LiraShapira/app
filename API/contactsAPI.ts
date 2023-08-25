import * as Contacts from 'expo-contacts';
import { Contact } from 'expo-contacts';

export function fetchContacts() {
    return new Promise<Contact[]>(async resolve => {
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
        resolve([]);
      }
    });
  }