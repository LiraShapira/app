import { View, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Link } from 'expo-router';
import Colors from '../../constants/Colors';
import { IconLibrary, IconName } from '../../types/Icons';
import { Route } from '../../types/Routes';
import { CustomIcon } from '../utils/CustomIcon';

interface DashboardButtonProps {
  iconName: IconName;
  iconLibrary: IconLibrary;
  route?: Route;
}

export default function DashboardButton({
  iconName,
  iconLibrary,
  route = '/Deposit',
}: DashboardButtonProps) {
  const colorScheme = useColorScheme();
  const onPress = () => {
    console.log('navigate to ' + route);
  };

  return (
    <Link href={route}>
      <View style={styles.labeledButton}>
        <Pressable onPress={onPress}>
          {({ pressed }) =>
            pressed ? (
              // TODO typing
              // @ts-ignore TODO typing
              <CustomIcon
                iconLibraryName={iconLibrary}
                iconName={iconName}
                color={Colors[colorScheme ?? 'light'].tint}
                size={30}
              />
            ) : (
              // TODO typing
              // @ts-ignore
              <CustomIcon
                iconLibraryName={iconLibrary}
                iconName={iconName}
                color={Colors[colorScheme ?? 'light'].text}
                size={30}
              />
            )
          }
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
