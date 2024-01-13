import {
  View,
  Pressable,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Colors from '../../constants/Colors';

export interface ButtonProps {
  text: string;
  disabled?: boolean;
  textColor?: string; 
  backgroundColor?: string; 
  onPress: (...args: any[]) => any;
  size?: 's' | 'm' | 'l';
  transparent?: boolean;
}

const fontSizeMap = {
  s: 12,
  m: 14,
  l: 24,
};

export default function CustomButton({
  text,
  onPress,
  disabled = false,
  size = 'm',
  textColor,
  backgroundColor,
  transparent
}: ButtonProps) {
  const calculatedBackgroundColor = backgroundColor ? backgroundColor : transparent ? 'transparent' : Colors.light.highlight;
  const calculatedtextColor = textColor ? textColor:  transparent ? 'black' : 'white'; 

  const transparentBorderStyles = {
    borderColor: '#BFC9B7',
    borderStyle: 'solid',
    borderWidth: '2px'
  }

  return (
    <View
      style={{
        backgroundColor: calculatedBackgroundColor,
        ...(disabled && { opacity: 0.7 }),
        ...styles.submitButton,
        ...(transparent && transparentBorderStyles)
      }}
    >
      <Pressable
        disabled={disabled}
        style={{ opacity: disabled ? 0.4 : 1 }}
        onPress={onPress}
      >
        <Text
          style={{
            fontWeight: '700',
            fontSize: fontSizeMap[size],
            color: calculatedtextColor
          }}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
