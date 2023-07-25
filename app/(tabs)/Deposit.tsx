import { View, StyleSheet, Text, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import Switch from '../../components/form/Switch';
import i18n from '../../translationService';

export default function Deposit() {
  const colorScheme = useColorScheme();

  const onPressSend = (e: any) => {
    console.log(e);
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 40,
          color: Colors[colorScheme ?? 'light'].text,
        }}
      >
        {i18n.t('deposit_tite')}
      </Text>
      <View style={styles.depositSwitches}>
        <View style={styles.depositSwitch}>
          <Text
            style={{ fontSize: 20, color: Colors[colorScheme ?? 'light'].text }}
          >
            {i18n.t('deposit_form_bin_status')}
          </Text>
        </View>
        <Switch
          initial={1}
          onPress={onPressSend}
          selectedColor={Colors[colorScheme ?? 'light'].text}
          backgroundColor={Colors[colorScheme ?? 'light'].shading}
          options={[
            { label: i18n.t('deposit_form_bin_status_full'), value: '1' },
            { label: i18n.t('deposit_form_bin_status_empty'), value: '0' },
          ]}
        />
        <View style={styles.depositSwitch}>
          <Text
            style={{ fontSize: 20, color: Colors[colorScheme ?? 'light'].text }}
          >
            compost smell
          </Text>
        </View>
        <Switch
          initial={1}
          onPress={onPressSend}
          selectedColor={Colors[colorScheme ?? 'light'].text}
          backgroundColor={Colors[colorScheme ?? 'light'].shading}
          options={[
            { label: i18n.t('deposit_form_bin_status_full'), value: '1' },
            { label: i18n.t('deposit_form_bin_status_empty'), value: '0' },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  depositSwitches: {
    display: 'flex',
    flexDirection: 'column',
  },
  depositSwitch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
