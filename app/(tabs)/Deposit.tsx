import {
  View,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import Colors from '../../constants/Colors';
import i18n from '../../translationService';
import DepositFormSwitch from '../../components/form/DepositFormSwitch';

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
        {i18n.t('deposit_title')}
      </Text>
      <View style={styles.depositSwitches}>
        <DepositFormSwitch
          title={i18n.t('deposit_form_bin_status')}
          switchLabels={[
            i18n.t('deposit_form_bin_status_full'),
            i18n.t('deposit_form_bin_status_empty'),
          ]}
        />
        <DepositFormSwitch
          title='Compost smell?'
          switchLabels={[i18n.t('no'), i18n.t('yes')]}
        />
        <DepositFormSwitch
          title='Dry matter?'
          switchLabels={[i18n.t('no'), i18n.t('some'), i18n.t('yes')]}
        />

        <Text>Notes</Text>
        <TextInput
          style={styles.input}
          placeholder="Any notes you'd like to add?"
        />
        <View style={styles.buttons}>
          <View
            style={{
              backgroundColor: Colors[colorScheme ?? 'light'].shading,
              ...styles.submitButton,
            }}
          >
            <Pressable>
              <Text
                style={{
                  color: Colors[colorScheme ?? 'light'].text,
                }}
              >
                Send
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              backgroundColor: Colors[colorScheme ?? 'light'].shading,
              ...styles.submitButton,
            }}
          >
            <Pressable style={styles.submitButton}>
              <Text
                style={{
                  color: Colors[colorScheme ?? 'light'].text,
                }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  depositSwitches: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    alignContent: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  depositSwitchContainer: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  depositSwitch: { flex: 1 },
  depositSwitchLabel: { flex: 1 },
  input: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  submitButton: {
    borderRadius: 200,
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
