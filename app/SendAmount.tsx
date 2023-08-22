import { View, Text, TextInput, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';
import Button from '../components/utils/Button';
import i18n from '../translationService';

export default function SendAmount() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Text
        style={{ fontSize: 24, color: Colors[colorScheme ?? 'light'].text }}
      >
        {i18n.t('sendamount_how_much')}
      </Text>
      <TextInput
        autoFocus
        maxLength={2}
        style={{
          fontSize: 44,
          textAlign: 'center',
          color: Colors[colorScheme ?? 'light'].text,
          borderBottomColor: Colors[colorScheme ?? 'light'].text,
          borderBottomWidth: 1,
        }}
        inputMode='numeric'
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          padding: 8,
          alignSelf: 'center',
        }}
      >
        <Button
          onPress={() => console.log('h')}
          text={i18n.t('sendamount_continue')}
        />
        <Button
          onPress={() => console.log('back')}
          text={i18n.t('sendamount_back')}
        />
      </View>
    </>
  );
}
