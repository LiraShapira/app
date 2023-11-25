import { View, useColorScheme } from "react-native";
import Colors from '../../constants/Colors';
import CustomButton, { ButtonProps } from "./CustomButton";

interface TagProps extends ButtonProps {
    active: boolean;
}

export default function CustomTag(props: TagProps) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <View >
            <CustomButton
                {...props}
                textColor={props.active ? Colors['light'].text : Colors[colorScheme].highlight }
                backgroundColor={props.active ? Colors[colorScheme].highlight : Colors['light'].background}
            />
        </View>
    )
}
