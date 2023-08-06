import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import ContactList from '../components/contacts/ContactList';
import { useState } from 'react';
import i18n from '../translationService';
import Colors from '../constants/Colors';

export default function Send() {
  const [filterTerms, setFilterTerms] = useState<string>('');
  const colorScheme = useColorScheme();

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
          {i18n.t('send_search_searching_for')} {filterTerms}
        </Text>
      )}
      <ContactList filterTerms={filterTerms} />
    </View>
  );
}
