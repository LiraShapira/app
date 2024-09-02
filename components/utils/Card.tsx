import { useColorScheme, View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default function Card({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: Colors[colorScheme].cardBackground,
      }}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    borderRadius: 18,
    paddingTop: 12,
    paddingBottom: 12,
    shadowColor: '#272424',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // boxShadow: '10px 5px 5px #a2a2a2';
  },
});
