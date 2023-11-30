import { Text, TextInput, View, useColorScheme } from 'react-native';
import ContactList from '../components/contacts/ContactList';
import { useEffect, useState } from 'react';
import i18n from '../translationService';
import Colors from '../constants/Colors';
import { Contact } from 'expo-contacts';
import { useDebounce } from '../hooks';
import { useSelector } from 'react-redux';
import { selectContacts } from '../store/userSlice';
import SearchResultsInfo from '../components/Send/SearchResultsInfo';
import {filterContactsCondition} from "./filterContactsCondition";

export default function Send() {
  const [filterTerms, setFilterTerms] = useState<string>('');
  const [filteredContacts, setfilteredContacts] = useState<Contact[]>([]);
  const colorScheme = useColorScheme();
  const debouncedFilterTerms: string = useDebounce(filterTerms, 300).toString();
  const contacts = useSelector(selectContacts);

  // when filter terms change
  // set filtered contacts
  useEffect(() => {

    const filterBySearchTerm = () => {
      setfilteredContacts(
        contacts.filter(cont =>  filterContactsCondition(cont, debouncedFilterTerms))
      );
    };
    if (debouncedFilterTerms) filterBySearchTerm();

  }, [debouncedFilterTerms]);

  return (
    <View style={{ padding: 8 }}>
      <Text
        style={{
          fontSize: 24,
          color: Colors[colorScheme ?? 'light'].text,
        }}
      >
        {i18n.t('send_search_title')}
      </Text>
      <TextInput
        style={{
          color: Colors[colorScheme ?? 'light'].text,
          borderStyle: 'solid',
          borderBottomColor: Colors[colorScheme ?? 'light'].text,
          borderBottomWidth: 1,
          paddingHorizontal: 4,
          width: '80%',
          alignSelf: 'center', // Center the TextInput element horizontally
        }}
        placeholder={i18n.t('send_search_placeholder')}
        placeholderTextColor={Colors[colorScheme ?? 'light'].shading}
        onChangeText={setFilterTerms}
      ></TextInput>
      {debouncedFilterTerms && (
        <SearchResultsInfo
          debouncedFilterTerms={debouncedFilterTerms}
          noContacts={filteredContacts.length === 0}
        />
      )}

      <View style={{ height: '100%' }}>
        <ContactList
          contacts={debouncedFilterTerms ? filteredContacts : contacts}
        />
      </View>
    </View>
  );
}
