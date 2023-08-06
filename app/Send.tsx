import { Text, TextInput, View } from 'react-native';
import ContactList from '../components/contacts/ContactList';
import { useState } from 'react';

export default function Send() {
  const [filterTerms, setFilterTerms] = useState<string>('');

  return (
    <View>
      <Text>Who to send to?</Text>
      <TextInput onChangeText={setFilterTerms}></TextInput>
      {filterTerms && <Text>searching for contacts: {filterTerms}</Text>}
      <ContactList filterTerms={filterTerms} />
    </View>
  );
}
