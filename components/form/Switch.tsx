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
  onPress: (v: string) => void;
  fontSize?: number;
  /**
   * Color of text of unselected item/s
   */
  textColor?: AppColor;
  /**
   * Color of text of selected item/s
   */
  selectedColor?: AppColor;
  /**
   * background color of the switch
   */
  backgroundColor?: AppColor;
  /**
   * Item selected in initial render (default -1)
   */
  initial?: number;
  /**
   *Color of the item/s selected
   */
  buttonColor?: AppColor;
  /*
   *Color of the item/s selected
   */
  buttonMargin?: number;
  /**
   *Border Radius of the component
   */
  borderRadius?: number;
  disabled?: boolean;
}

/**
 * a wrapper for SwitchSelector from 'react-native-switch-selector' to provide type local support
 */
export default function Switch(props: SwitchProps) {
  return props.disabled ? (
    <SwitchSelector style={{ opacity: 0.4 }} {...props}></SwitchSelector>
  ) : (
    <SwitchSelector {...props}></SwitchSelector>
  );
}
