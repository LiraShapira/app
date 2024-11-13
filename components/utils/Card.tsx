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
        backgroundColor: Colors[colorScheme].backgroundHighlight1,
      }}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin:10,
    marginHorizontal: 8,
    paddingBottom: 12,
    borderRadius: 29,
    shadowColor: '#272424',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
