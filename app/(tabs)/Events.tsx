import { ScrollView, StyleSheet, View } from 'react-native';
import GradientContainer from '../../components/utils/GradientContainer';
import EventsList from '../../components/events/EventsList';

const TAB_BAR_SAFE_BOTTOM = 88;

export default function TabTwoScreen() {
  return (
    <GradientContainer styles={styles.container}>
      <View style={styles.scrollWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
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
    minHeight: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollWrapper: {
    width: '90%',
    flex: 1,
    minHeight: 0,
  },
  scrollContent: {
    paddingBottom: TAB_BAR_SAFE_BOTTOM,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
  },
});
