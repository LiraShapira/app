import { NumberLabel } from "../components/form/NumberInputNumberPad";

const DEPOSIT_MAX_AMOUNT = 100;
const SEND_MAX_AMOUNT = 1000;

export const parseNumberPadInputForOTP = (n: NumberLabel, oldValue: string): string | false => {
  if (oldValue.length === 7) return false;
  if (n === 'ret') {
    return oldValue.slice(0, -1);
  }
  if (n === '.') {
    return false;
  }

  return oldValue + n;
};

export const parseNumberPadInputWithMax = (
  n: NumberLabel,
  oldValue: string,
  maxAmount: number,
): string | false => {
  if (n === 'ret') {
    return oldValue.slice(0, -1);
  }
  if (oldValue.includes('.') && n === '.') {
    return false;
  }

  const baseValue =
    oldValue === '0' && n !== '.' ? '' : oldValue;

  if (!baseValue && n === '0') return false;

  const newValue = baseValue + n;
  if (parseFloat(newValue) > maxAmount) return false;
  if (newValue.includes('.') && newValue.split('.')[1].length > 1) return false;
  return newValue;
};

export const parseNumberPadInputForDeposit = (
  n: NumberLabel,
  oldValue: string,
): string | false => parseNumberPadInputWithMax(n, oldValue, DEPOSIT_MAX_AMOUNT);

export const parseNumberPadInputForSend = (
  n: NumberLabel,
  oldValue: string,
): string | false => parseNumberPadInputWithMax(n, oldValue, SEND_MAX_AMOUNT);

export const parseNumberPadInputForPhoneNumber = (n: NumberLabel, oldValue: string): string | false => {
  if (n === 'ret') {
    return oldValue.slice(0, -1);
  }
  const newValue = oldValue + n;
  if (oldValue.length === 13) return oldValue;
  return newValue;
};

export function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}.${month}`;
}

export function formatTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
