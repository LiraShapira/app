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
import SendFlowHeader from '../components/utils/StepsHeader';
import { filterContactsCondition } from './filterContactsCondition';
import GradientContainer from '../components/utils/GradientContainer';
import { useLocalSearchParams } from 'expo-router';

export default function Send() {
  const [filterTerms, setFilterTerms] = useState<string>('');
  const [filteredContacts, setfilteredContacts] = useState<Contact[]>([]);
  const colorScheme = useColorScheme();
  const debouncedFilterTerms: string = useDebounce(filterTerms, 300).toString();
  const contacts = useSelector(selectContacts);
  const params = useLocalSearchParams();
  const { isRequest } = params;

  // when filter terms change
  // set filtered contacts
  useEffect(() => {
    const filterBySearchTerm = () => {
      setfilteredContacts(
        contacts.filter((cont) =>
          filterContactsCondition(cont, debouncedFilterTerms)
        )
      );
    };
    if (debouncedFilterTerms) filterBySearchTerm();
  }, [debouncedFilterTerms]);

  return (
    <GradientContainer style={{ padding: 8 }}>
      <SendFlowHeader stage='who' />
      <Text
        style={{
          fontSize: 24,
          color: Colors[colorScheme ?? 'light'].text,
        }}
      >
        {isRequest === 'true'
          ? i18n.t('request_search_title')
          : i18n.t('send_search_title')}
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
        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
        onChangeText={setFilterTerms}
      />
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
    </GradientContainer>
  );
}
