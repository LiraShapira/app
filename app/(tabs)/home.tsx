import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import TransactionsList from '../../components/transactions/TransactionsList';
import { mockUser } from '../../Mocks/mockDB';
import Dashboard from '../../components/Dashboard';

export default function TabOneScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const onPressDeposit = () => {
    console.log('navigate to deposit');
  };

  // const onPressSend = () => {
  //   router.replace('/modal');
  // };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Colors[colorScheme ?? 'light'].shading,
          width: '100%',
        }}
      >
        <Dashboard />
      </View>
      <View style={styles.transactionList}>
        <Text style={{ fontSize: 40 }}>My Activities</Text>
        <TransactionsList currentUser={mockUser} />
      </View>
      <View style={styles.binButton}>
        <Pressable onPress={onPressDeposit}>
          {({ pressed }) => (
            <FontAwesome
              name='trash'
              size={55}
              color={Colors[colorScheme ?? 'light'].text}
              style={{
                margin: 4,
                marginHorizontal: 10,
                opacity: pressed ? 0.5 : 1,
              }}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'grey',
    borderRadius: 50,
    fontSize: 40,
  },
  binButton: {
    position: 'absolute',
    bottom: 10,
    borderWidth: 3,
    borderRadius: 30,
  },
  transactionList: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
