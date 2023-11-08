import { View, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
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
  route,
}: DashboardButtonProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <>
      {route ? (
        <View style={{ ...styles.labeledButton, backgroundColor: 'grey' }}>
          <Pressable onPress={() => router.push(route)}>
            {({ pressed }) => (
              // TODO typing
              // @ts-ignore TODO typing
              <CustomIcon
                iconLibraryName={iconLibrary}
                iconName={iconName}
                color={
                  pressed
                    ? Colors[colorScheme ?? 'light'].tint
                    : Colors[colorScheme ?? 'light'].text
                }
                size={30}
              />
            )}
          </Pressable>
        </View>
      ) : (
        <View>
          <View
            style={{
              ...styles.labeledButton,
              backgroundColor: '#5f5f5f',
              opacity: 0.5,
            }}
          >
            <Pressable>
              {() => (
                // TODO typing
                // @ts-ignore TODO typing
                <CustomIcon
                  iconLibraryName={iconLibrary}
                  iconName={iconName}
                  disabled
                  color={Colors[colorScheme ?? 'light'].text}
                  size={30}
                />
              )}
            </Pressable>
          </View>
        </View>
      )}
    </>
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
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
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
