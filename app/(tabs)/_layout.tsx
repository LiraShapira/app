import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import { CustomIcon } from '../../components/utils/CustomIcon';
import i18n from '../../translationService';
import { IconLibrary } from '../../types/Icons';

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
              iconName='wallet_icon'
              size={25}
              iconLibraryName={IconLibrary.Local}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='Deposit'
        options={{
          href: null,
          title: i18n.t('deposit'),
          tabBarIcon: () => (
            <CustomIcon
              iconName="leaf-circle-outline"
              iconLibraryName={IconLibrary.MaterialCommunityIcons}
              size={55}
              color={Colors[colorScheme ?? 'light'].text}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='Events'
        options={{
          headerShown: false,
          title: i18n.t('tabs_events'),
          tabBarIcon: ({ color }) => (
            <CustomIcon
              iconName={'events_icon'}
              iconLibraryName={IconLibrary.Local}
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
