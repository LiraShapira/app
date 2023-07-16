import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Link } from 'expo-router';
import Colors from '../../constants/Colors';
import { IconLibrary, IconName } from '../../types/Icons';
import { CustomIcon } from '../CustomIcon';

interface DashboardButtonProps {
  iconName: IconName;
  iconLibrary: IconLibrary;
}

export default function DashboardButton({
  iconName,
  iconLibrary,
}: DashboardButtonProps) {
  const colorScheme = useColorScheme();
  const onPressSend = () => {
    console.log('navigate to deposit');
  };

  return (
    <Link href='/modal'>
      <View style={styles.labeledButton}>
        <Pressable onPress={onPressSend}>
          {({ pressed }) => (
            <CustomIcon
              iconLibraryName={iconLibrary}
              iconName={iconName}
              color={Colors[colorScheme ?? 'light'].text}
              size={35}
            />
          )}
        </Pressable>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  labeledButton: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    height: 70,
    width: 70,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'grey',
    borderRadius: 50,
    fontSize: 40,
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
});
