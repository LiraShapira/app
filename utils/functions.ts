import { NumberLabel } from "../components/form/NumberInputNumberPad";

export const parseNumberPadInputForOTP = (n: NumberLabel, oldValue: string): string | false => {
  if (oldValue.length === 7) return false;
  if (n === 'ret') {
    return oldValue.slice(0, -1);
  }
  // prevent adding decimal point
  if (n === '.') {
    return false;
  }

  return oldValue + n;

}

export const parseNumberPadInputForDeposit = (n: NumberLabel, oldValue: string): string | false => {
  let newValue = oldValue;
  // always allow backspace
  if (n === 'ret') {
    return oldValue.slice(0, -1);
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

export const parseNumberPadInputForPhoneNumber = (n: NumberLabel, oldValue: string): string | false => {
  if (n === 'ret') {
    return oldValue.slice(0, -1);
  }
  let newValue = oldValue + n;
  if (oldValue.length === 13) return oldValue;
  return newValue;


}


// Function to format the date to 'DD.MM'
export function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}.${month}`;
}

// Function to format the time to 'HH:MM'
export function formatTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
