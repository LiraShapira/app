import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import { CustomIcon } from '../../components/utils/CustomIcon';
import DepositButton from '../../components/tabsBar/DepositButton';
import i18n from '../../translationService';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name='Home'
        options={{
          title: i18n.t('tabs_wallet'),
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          headerRight: () => (
            <View
              style={{
                padding: 8,
              }}
            >
              <Link disabled href='/modal' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <CustomIcon
                      iconName='menu'
                      iconLibraryName='Entypo'
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='Deposit'
        options={{
          title: '',
          tabBarIcon: () => <DepositButton />,
        }}
      />
      <Tabs.Screen
        name='Two'
        options={{
          title: i18n.t('tabs_market'),
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
        }}
      />
    </Tabs>
  );
}
