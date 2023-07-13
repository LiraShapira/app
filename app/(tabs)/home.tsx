import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { Link, useRouter } from 'expo-router';
import TransactionsList from '../../components/transactions/TransactionsList';
import { mockUser } from '../../Mocks/mockDB';

export default function TabOneScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const onPressDeposit = () => {
    console.log('navigate to deposit');
  };

  const onPressSend = () => {
    router.replace('/modal');
  };

  return (
    <View style={styles.container}>
      <View style={styles.dashboard}>
        <Text style={styles.subtitle}>You Have:</Text>
        <Text style={styles.title}>200LS</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.labeledButton}>
            <Pressable style={styles.icon}>
              {({ pressed }) => (
                <Ionicons
                  name='scan-circle'
                  size={24}
                  color={Colors[colorScheme ?? 'light'].text}
                />
              )}
            </Pressable>
            <Text style={{ textAlign: 'center' }}>Request</Text>
          </View>
          <View style={styles.labeledButton}>
            <Pressable style={styles.icon}>
              {({ pressed }) => (
                <FontAwesome5
                  name='hand-holding-medical'
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
            <Text style={{ textAlign: 'center' }}>Request</Text>
          </View>
          <Link href='/modal'>
            <View style={styles.labeledButton}>
              <Pressable onPress={onPressSend} style={styles.icon}>
                {({ pressed }) => (
                  <FontAwesome
                    name='paper-plane'
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
              <Text style={{ textAlign: 'center' }}>Send</Text>
            </View>
          </Link>
        </View>
      </View>
      <TransactionsList currentUser={mockUser}></TransactionsList>
      <View style={styles.binButton}>
        <Pressable onPress={onPressDeposit}>
          {({ pressed }) => (
            <FontAwesome
              name='trash'
              size={55}
              color={Colors[colorScheme ?? 'light'].text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labeledButton: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  dashboard: {
    position: 'absolute',
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    // borderWidth: 3,
    // borderRadius: 30,
    // borderColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#fff',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
