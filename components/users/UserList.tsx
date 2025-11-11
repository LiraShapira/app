import { ScrollView, View } from 'react-native';
import UserItem from './UserItem';
import { User } from '../../types/User';

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <View style={{ gap: 8, padding: 8 }}>
      <ScrollView style={{ height: '80%' }}>
        {users.map((user) => {
          if (user.phoneNumber) {
            return (
              <View key={user.id}>
                <UserItem user={user} />
              </View>
            );
          } else {
            return null;
          }
        })}
      </ScrollView>
    </View>
  );
}

