import { ScrollView, View } from 'react-native';
import ContactItem from './ContactItem';
import { Contact } from 'expo-contacts';

interface ContactListProps {
  contacts: Contact[];
}

export default function ContactList({ contacts }: ContactListProps) {
  return (
    <View style={{ gap: 8, padding: 8 }}>
      <ScrollView style={{ height: '80%' }}>
        {contacts.map((contact, i) => {
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
