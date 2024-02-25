import { View, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { ExpoIcon } from '../../types/Icons';
import { Route } from '../../types/Routes';
import { CustomIcon } from '../utils/CustomIcon';

interface UniqueDashboardButtonProps {
  route?: Route;
  params?: object;
}

type DashboardButtonProps = UniqueDashboardButtonProps & ExpoIcon

export default function DashboardButton({
  iconName,
  iconLibraryName,
  route,
  params = {}
}: DashboardButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  return (
    <>
      {route ? (
        <View style={{ ...styles.labeledButton }}>
          <Pressable onPress={() => router.push({ pathname: route, params })}>
            {({ pressed }) => (
              <CustomIcon
                iconLibraryName={iconLibraryName}
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
                <CustomIcon
                  iconLibraryName={iconLibraryName}
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
