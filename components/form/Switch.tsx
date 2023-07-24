// @ts-ignore
import SwitchSelector from 'react-native-switch-selector';
import React from 'react';
import { AppColor } from '../../constants/Colors';

interface Option {
  label: string;
  value: string;
  customIcon?: React.FC;
  imageIcon?: string;
  activeColor?: string;
  testID?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
}

interface SwitchProps {
  options: Option[];
  onPress: (e: any) => void;
  fontSize?: number;
  textColor?: AppColor;
  /**
   * Color of text of selected item
   */
  selectedColor?: AppColor;
  /**
   * background color of the switch
   */
  backgroundColor?: AppColor;
}

export default function Switch(props: SwitchProps) {
  return <SwitchSelector {...props}></SwitchSelector>;
}
