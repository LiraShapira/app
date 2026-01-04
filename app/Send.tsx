import { Text, TextInput, View, useColorScheme } from 'react-native';
import UserList from '../components/users/UserList';
import { useEffect, useState } from 'react';
import i18n from '../translationService';
import Colors from '../constants/Colors';
import { User } from '../types/User';
import { useDebounce } from '../hooks';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectAllUsers, loadAllUsers, selectUser } from '../store/userSlice';
import SearchResultsInfo from '../components/Send/SearchResultsInfo';
import SendFlowHeader from '../components/utils/StepsHeader';
import { filterUsersCondition } from './filterUsersCondition';
import GradientContainer from '../components/utils/GradientContainer';
import { useLocalSearchParams } from 'expo-router';

export default function Send() {
  const [filterTerms, setFilterTerms] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const colorScheme = useColorScheme();
  const debouncedFilterTerms: string = useDebounce(filterTerms, 300).toString();
  const allUsers = useAppSelector(selectAllUsers);
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  const { isRequest } = params;

  // Load users on mount
  useEffect(() => {
    dispatch(loadAllUsers());
  }, [dispatch]);

  // Filter out current user and apply search filter
  useEffect(() => {
    // Filter out current user from the list
    const otherUsers = (allUsers || []).filter((user) => user.id !== currentUser.id);
    
    if (debouncedFilterTerms) {
      setFilteredUsers(
        otherUsers.filter((user) =>
          filterUsersCondition(user, debouncedFilterTerms)
        )
      );
    } else {
      setFilteredUsers(otherUsers);
    }
  }, [debouncedFilterTerms, allUsers, currentUser.id]);

  return (
    <GradientContainer style={{ padding: 8 }}>
      <SendFlowHeader stage='who' />
      <Text
        style={{
          fontSize: 24,
          color: Colors[colorScheme ?? 'light'].text,
          marginLeft: 10,
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
          noContacts={filteredUsers.length === 0}
        />
      )}

      <View style={{ height: '100%' }}>
        <UserList users={filteredUsers} />
      </View>
    </GradientContainer>
  );
}
