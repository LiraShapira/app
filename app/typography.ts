import { Text, TextInput } from 'react-native';

export const freezeTextStyles = () => {
  // 1. Force Text to not scale
  // @ts-ignore
  if (Text.defaultProps == null) {
    // @ts-ignore
    Text.defaultProps = {};
  }
  // @ts-ignore
  Text.defaultProps.allowFontScaling = false;
  // @ts-ignore
  Text.defaultProps.maxFontSizeMultiplier = 1.0;

  // 2. Force TextInput to not scale
  // @ts-ignore
  if (TextInput.defaultProps == null) {
    // @ts-ignore
    TextInput.defaultProps = {};
  }
  // @ts-ignore
  TextInput.defaultProps.allowFontScaling = false;
  // @ts-ignore
  TextInput.defaultProps.maxFontSizeMultiplier = 1.0;
};

// Execute immediately
freezeTextStyles();