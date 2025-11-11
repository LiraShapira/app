import { User } from '../../types/User';
import { Pressable, Text, View, useColorScheme } from 'react-native';
import { CustomIcon } from '../utils/CustomIcon';
import Colors from '../../constants/Colors';
import { setChosenUser } from '../../store/sendFormSlice';
import { useAppDispatch } from '../../hooks';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface UserItemProps {
  user: User;
}

export default function UserItem({ user }: UserItemProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { isRequest } = params;

  const onSelectUser = () => {
    dispatch(setChosenUser(user));
    if (isRequest) {
      router.push({ pathname: '/SendAmount', params: { isRequest } });
    } else {
      router.push('/SendAmount');
    }
  };

  return (
    <Pressable onPress={onSelectUser}>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <CustomIcon
          color={Colors[colorScheme].text}
          size={65}
          iconName='person-circle'
          iconLibraryName='Ionicons'
        />
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: 15,
              color: Colors[colorScheme].text,
            }}
          >
            {user.firstName} {user.lastName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

