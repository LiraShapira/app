import { Link, Tabs } from 'expo-router';
import { Pressable, View, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import { CustomIcon } from '../../components/utils/CustomIcon';
import DepositButton from '../../components/tabsBar/DepositButton';
import i18n from '../../translationService';

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
          tabBarIcon: ({ color }) => (
            <CustomIcon
              iconName='wallet'
              size={25}
              iconLibraryName='Entypo'
              color={color}
            />
          ),
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
          tabBarIcon: () => (
            <CustomIcon
              iconName="leaf-circle-outline"
              iconLibraryName="MaterialCommunityIcons"
              size={55}
              color={Colors[colorScheme ?? 'light'].text}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='Market'
        options={{
          title: i18n.t('tabs_market'),
          tabBarIcon: ({ color }) => (
            <CustomIcon
              iconName={'shopping-basket'}
              iconLibraryName='FontAwesome'
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
