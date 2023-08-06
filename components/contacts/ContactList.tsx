import { ScrollView, View } from 'react-native';
import { contactsContext } from '../../app/_layout';
import { useContext } from 'react';
import ContactItem from './ContactItem';

export default function ContactList() {
  const contacts = useContext(contactsContext);
  const localContacts = contacts.filter((c) => c.phoneNumbers?.length);
  return (
    <View style={{ gap: 8, padding: 8 }}>
      <ScrollView style={{ height: '80%' }}>
        {localContacts.map((contact, i) => {
          if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
            return (
              <View key={`${contact.phoneNumbers[0].number}-${i}`}>
                <ContactItem contact={contact} />
              </View>
            );
          } else {
            return null;
          }
        })}
      </ScrollView>
    </View>
  );
}
