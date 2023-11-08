import { Contact } from 'expo-contacts';
import { Pressable, Text, View, useColorScheme } from 'react-native';
import { CustomIcon } from '../utils/CustomIcon';
import Colors from '../../constants/Colors';
import { setChosenContact } from '../../store/sendFormSlice';
import { useAppDispatch } from '../../hooks';
import { useRouter } from 'expo-router';

interface ContactItemProps {
  contact: Contact;
}

export default function ContactItem({ contact }: ContactItemProps) {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSelectContact = () => {
    dispatch(setChosenContact(contact));
    router.replace('/SendAmount');
  };

  return (
    <Pressable onPress={onSelectContact}>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <CustomIcon
          color={Colors[colorScheme ?? 'light'].text}
          size={65}
          iconName='person-circle'
          iconLibraryName='Ionicons'
        />
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: 15,
              color: Colors[colorScheme ?? 'light'].text,
            }}
          >
            {contact.firstName}{' '}
            {contact.lastName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
