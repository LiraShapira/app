import { ScrollView, StyleSheet, View } from 'react-native';
import GradientContainer from '../../components/utils/GradientContainer';
import EventsList from '../../components/events/EventsList';

export default function TabTwoScreen() {
  return (
    <GradientContainer styles={styles.container}>
      <View
        style={{
          paddingHorizontal: '5%',
          width: '100%',
          flex: 1,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ ...styles.scrollView, flexGrow: 1 }}
        >
          <EventsList />
        </ScrollView>
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
  scrollView: {
    //   ::-webkit-scrollbar {
    //     display: none;  /* Safari and Chrome */
    // }
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
