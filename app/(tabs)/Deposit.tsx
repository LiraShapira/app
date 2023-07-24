import { View, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import Switch from '../../components/form/Switch';

export default function Deposit() {
  const colorScheme = useColorScheme();

  const onPressSend = (e: any) => {
    console.log(e);
  };

  return (
    <View>
      <Switch
        initial={1}
        onPress={onPressSend}
        selectedColor={Colors[colorScheme ?? 'light'].text}
        backgroundColor={Colors[colorScheme ?? 'light'].shading}
        options={[
          { label: 'test one', value: 's' },
          { label: 'test two', value: 'a' },
        ]}
      />
    </View>
  );
}
