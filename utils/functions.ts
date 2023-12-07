import { NumberLabel } from "../components/form/NumberInputNumberPad";

export const parseNumberPadInput = (n: NumberLabel, oldValue: string): string | false => {
  let newValue = oldValue;
  // always allow backspace
  if (n === 'ret') {
    return oldValue.slice(0, -1) || '';
  }
  // prevent adding decimal point if one exists
  if (oldValue.includes('.') && n === '.') {
    return false;
  }
  if (!oldValue && n === '0') return false;

  // now we can assume newValue is valid number
  // now we test new value against constraints
  newValue = oldValue + n;
  // max 100
  if (parseFloat(newValue) > 100) return false;
  // max 2 decimal places
  if (newValue.includes('.') && newValue.split('.')[1].length > 2) return false;
  return oldValue + n;
}
