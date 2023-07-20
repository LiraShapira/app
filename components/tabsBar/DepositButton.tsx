import { View, StyleSheet, Pressable, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import { CustomIcon } from '../utils/CustomIcon';

export default function depositButton() {
  const colorScheme = useColorScheme();
  const onPressDeposit = () => {
    console.log('navigate to deposit');
  };
  return (
    <View style={styles.depositButton}>
      <Pressable onPress={onPressDeposit}>
        {({ pressed }) => (
          <View
            style={{
              opacity: pressed ? 0.5 : 1,
            }}
          >
            <CustomIcon
              iconName='leaf-circle-outline'
              iconLibraryName='MaterialCommunityIcons'
              size={55}
              color={Colors[colorScheme ?? 'light'].text}
            />
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  depositButton: {
    position: 'absolute',
  },
});
