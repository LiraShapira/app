import { Text, View, StyleSheet, useColorScheme } from 'react-native';

export default function depositButton() {
  const colorScheme = useColorScheme();
  const onPressDeposit = () => {
    console.log('navigate to deposit');
  };
  return (
    <View style={styles.depositButton}>
      <Text>hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  depositButton: {
    position: 'absolute',
    bottom: -20,
    zIndex: 4,
  },
});
