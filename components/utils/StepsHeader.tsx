import { View, Text, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import i18n from '../../translationService';
import Colors from '../../constants/Colors';
import { CustomIcon } from './CustomIcon';
import { IconLibrary } from '../../types/Icons';
import { getLocales } from 'expo-localization';

export type SendStage = 'who' | 'amount' | 'reason';

interface SendFlowHeaderProps {
  stage: SendStage;
}
const textDirection = getLocales()[0].textDirection || 'ltr';
export default function SendFlowHeader({ stage }: SendFlowHeaderProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  const stages = [
    { key: 'who', label: i18n.t('send_flow_header_who') },
    { key: 'amount', label: i18n.t('send_flow_header_how_much') },
    { key: 'reason', label: i18n.t('send_flow_header_why') },
  ];

  const currentIndex = stages.findIndex((s) => s.key === stage);
  const arrowStyle = textDirection === 'rtl' ? { marginLeft: 15 } : { marginRight: 25 };
  return (
    <View style={styles.container}>
      <View style={styles.bubbles}>
        {(textDirection === 'rtl' ? [...stages].reverse() : stages).map((s, index, arr) => {
          // Adjust index for RTL so currentIndex matches correct bubble
          const displayIndex = textDirection === 'rtl' ? stages.length - 1 - index : index;
          const isLast = index === arr.length - 1;
          return (
            <View key={s.key} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={[
                  styles.bubble,
                  {
                    backgroundColor: Colors[colorScheme].background,
                    opacity: displayIndex < currentIndex ? 0.5 : 1,
                  },
                ]}
              >
                <Text style={{ marginHorizontal: 4, color: Colors[colorScheme].text }}>{s.label}</Text>
              </View>
              {!isLast && (
                <CustomIcon
                  iconLibraryName={IconLibrary.Entypo}
                  iconName={textDirection === 'rtl' ? 'arrow-left' : 'arrow-right'}
                  size={18}
                  color={Colors[colorScheme].background}
                />
              )}
            </View>
          );
        })}
      </View>
      <Pressable style={styles.close} onPress={() => router.push('/Home')}>
        <CustomIcon
          iconLibraryName={IconLibrary.Ionicons}
          iconName='close'
          size={24}
          color={Colors[colorScheme].text}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  bubbles: {
    flexDirection: 'row',
  },
  bubble: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  close: {
    position: 'absolute',
    right: 0,
  },
});
