import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './en';
import he from './he';
import ar from './ar';

// Set the key-value pairs for the different languages you want to support.
const translations = {
  en,
  // language code is 'he' & 'iw' for different devices
  he,
  iw: he,
  ar,
};
const i18n = new I18n(translations);
const deviceLanguage = getLocales()[0].languageCode;
// Set the locale once at the beginning of your app.
i18n.locale = deviceLanguage;

export default i18n;
