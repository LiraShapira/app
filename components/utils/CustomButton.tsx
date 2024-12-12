import { View, Pressable, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export interface ButtonProps {
  text: string;
  disabled?: boolean;
  textColor?: string;
  backgroundColor?: string;
  onPress: (...args: any[]) => any;
  transparent?: boolean;
  showDeleteButton?: boolean;
  onDelete?: (text: string) => void;
}

export default function CustomButton({
  text,
  onDelete = () => {},
  showDeleteButton,
  onPress,
  disabled = false,
  textColor,
  backgroundColor,
  transparent,
}: ButtonProps) {
  const calculatedBackgroundColor = backgroundColor
    ? backgroundColor
    : transparent
    ? 'transparent'
    : Colors.light.highlight;
  const calculatedtextColor = textColor
    ? textColor
    : transparent
    ? 'black'
    : 'white';

  const transparentBorderStyles = {
    borderColor: '#BFC9B7',
    borderStyle: 'solid',
    borderWidth: 2,
  };

  return (
    <View
      style={{
        backgroundColor: calculatedBackgroundColor,
        ...(disabled && { opacity: 0.7 }),
        ...styles.submitButton,
        ...(transparent && transparentBorderStyles),
        flexDirection: 'row',
        gap: 10,
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
            fontSize: 14,
            color: calculatedtextColor,
          }}
        >
          {text}
        </Text>
      </Pressable>
      {showDeleteButton && (
        <Pressable onPress={(e) => onDelete(text)}>
          <Text>x</Text>
        </Pressable>
      )}
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
    height:40,
  },
});
