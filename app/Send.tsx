import { Text, TextInput, View, useColorScheme } from 'react-native';
import ContactList from '../components/contacts/ContactList';
import { useContext, useEffect, useState } from 'react';
import i18n from '../translationService';
import Colors from '../constants/Colors';
import { contactsContext } from './_layout';
import { Contact } from 'expo-contacts';
import { useDebounce } from '../hooks';

export default function Send() {
  const [filterTerms, setFilterTerms] = useState<string>('');
  const [filteredContacts, setfilteredContacts] = useState<Contact[]>([]);
  const colorScheme = useColorScheme();
  const contacts = useContext(contactsContext);
  const debouncedFilterTerms = useDebounce(filterTerms, 300);

  // console.log('flatmap');
  // const phoneNumbersFlatMap = contacts
  //   .filter((c) => c.phoneNumbers?.length)
  //   .flatMap((c) => c.phoneNumbers?.map((phoneNumber) => phoneNumber.number));

  // when filter terms change
  // set filtered contacts
  useEffect(() => {
    const filterContacts = (c: Contact) => {
      if (c.phoneNumbers?.length) {
        return (
          c.firstName?.includes(debouncedFilterTerms) ||
          c.lastName?.includes(debouncedFilterTerms)
          // phoneNumbersFlatMap.findIndex((e) => e?.includes(filterTerms)) !== -1
        );
      }
    };

    const filterBySearchTerm = () => {
      setfilteredContacts(
        contacts.filter((c) => c.phoneNumbers?.length).filter(filterContacts)
      );
    };
    if (debouncedFilterTerms) filterBySearchTerm();
  }, [debouncedFilterTerms]);

  return (
    <View>
      <Text>{i18n.t('send_search_title')}</Text>
      <TextInput
        style={{
          color: Colors[colorScheme ?? 'light'].text,
          borderStyle: 'solid',
          borderColor: Colors[colorScheme ?? 'light'].text,
          borderWidth: 1,
          paddingHorizontal: 4,
          width: '80%',
        }}
        placeholder={i18n.t('send_search_placeholder')}
        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
        onChangeText={setFilterTerms}
      ></TextInput>
      {filterTerms && (
        <Text>
          {i18n.t('send_search_searching_for')} {debouncedFilterTerms}
        </Text>
      )}
      <ContactList
        contacts={debouncedFilterTerms ? filteredContacts : contacts}
      />
    </View>
  );
}
