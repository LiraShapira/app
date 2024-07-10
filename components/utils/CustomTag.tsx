import { View, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import CustomButton, { ButtonProps } from './CustomButton';

interface TagProps extends ButtonProps {
  active: boolean;
}

export default function CustomTag(props: TagProps) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View style={{ padding: 4 }}>
      <CustomButton
        {...props}
        textColor={props.active ? 'black' : Colors[colorScheme].highlight}
        backgroundColor={props.active ? Colors[colorScheme].highlight : 'white'}
      />
    </View>
  );
}
