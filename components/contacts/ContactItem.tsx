import { Contact } from 'expo-contacts';
import { Text, View, useColorScheme } from 'react-native';
import { CustomIcon } from '../utils/CustomIcon';
import Colors from '../../constants/Colors';

interface ContactItemProps {
  contact: Contact;
}

export default function ContactItem({ contact }: ContactItemProps) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <CustomIcon
        color={Colors[colorScheme ?? 'light'].text}
        size={45}
        iconName='person-circle'
        iconLibraryName='Ionicons'
      />
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            fontSize: 10,
            color: Colors[colorScheme ?? 'light'].text,
          }}
        >
          {contact.firstName}{' '}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: Colors[colorScheme ?? 'light'].text,
          }}
        >
          {contact.lastName}
        </Text>
      </View>
    </View>
  );
}
