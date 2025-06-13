import { View, Text, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import i18n from '../../translationService';
import Colors from '../../constants/Colors';
import { CustomIcon } from '../utils/CustomIcon';
import { IconLibrary } from '../../types/Icons';

export type SendStage = 'who' | 'amount' | 'reason';

interface SendFlowHeaderProps {
  stage: SendStage;
}

export default function SendFlowHeader({ stage }: SendFlowHeaderProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  const stages = [
    { key: 'who', label: i18n.t('send_flow_header_who') },
    { key: 'amount', label: i18n.t('send_flow_header_how_much') },
    { key: 'reason', label: i18n.t('send_flow_header_why') },
  ];

  const currentIndex = stages.findIndex((s) => s.key === stage);

  return (
    <View style={styles.container}>
      <View style={styles.bubbles}>
        {stages.map((s, index) => (
          <View
            key={s.key}
            style={[
              styles.bubble,
              {
                backgroundColor: Colors[colorScheme].backgroundHighlight1,
                opacity: index < currentIndex ? 0.5 : 1,
              },
            ]}
          >
            <Text style={{ color: Colors[colorScheme].text }}>{s.label}</Text>
          </View>
        ))}
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
    gap: 10,
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
