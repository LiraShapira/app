import { Contact } from 'expo-contacts';
import { Text, View } from 'react-native';
import { CustomIcon } from '../utils/CustomIcon';

interface ContactItemProps {
  contact: Contact;
}

export default function ContactItem({ contact }: ContactItemProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <CustomIcon
        size={45}
        iconName='person-circle'
        iconLibraryName='Ionicons'
      />
      <View style={{ flexDirection: 'row' }}>
        <Text>{contact.firstName} </Text>
        <Text>{contact.lastName}</Text>
      </View>
    </View>
  );
}
