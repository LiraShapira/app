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
  onDelete,
  showDeleteButton,
  onPress,
  disabled = false,
  textColor,
  backgroundColor,
  transparent,
}: ButtonProps) {
  const bg = backgroundColor
    ? backgroundColor
    : transparent
      ? 'transparent'
      : Colors.light.highlight;
  const fg = textColor
    ? textColor
    : transparent
      ? 'black'
      : 'white';

  const transparentBorderStyles = {
    borderColor: '#BFC9B7',
    borderStyle: 'solid' as const,
    borderWidth: 2,
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.submitButton,
        { backgroundColor: bg },
        transparent && transparentBorderStyles,
        disabled && { opacity: 0.7 },
        { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Text
        style={{
          fontWeight: '700',
          fontSize: 14,
          color: fg,
          marginRight: showDeleteButton ? 10 : 0,  // replace `gap`
        }}
      >
        {text}
      </Text>

      {showDeleteButton && (
        <Pressable onPress={() => onDelete?.(text)}>
          <Text style={{ color: fg }}>×</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
});
