import { StyleSheet } from 'react-native';
import { Text } from '../../components/Themed';
import GradientContainer from '../../components/utils/GradientContainer';

export default function TabTwoScreen() {
  return (
    <GradientContainer styles={styles.container}>
      <Text style={styles.title}>Coming Soon...</Text>
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
