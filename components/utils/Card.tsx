import { useColorScheme, View, StyleSheet } from 'react-native';
import Colors from "../../constants/Colors";

export default function Card({children}: { children: JSX.Element[] }) {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <View style={{ ...styles.card, backgroundColor: Colors[colorScheme].backgroundHighlight1 }}>
      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 8,
    margin: 8,
    width: '80%',
    borderRadius: 29,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // boxShadow: '10px 5px 5px #a2a2a2';
  }
});
