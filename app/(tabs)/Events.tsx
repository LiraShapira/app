import { ScrollView, StyleSheet, View } from 'react-native';
import GradientContainer from '../../components/utils/GradientContainer';
import EventsList from '../../components/events/EventsList';

export default function TabTwoScreen() {
  return (
    <GradientContainer styles={styles.container}>
      <View style={{ width: '90%' }}>
        <EventsList />
      </View>
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
