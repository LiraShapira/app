// path-to-your-mock-file.js
export class I18n {
    translations = {};
    locale = '';
  
    t = (key) => key; // Minimal implementation for translation function
    currentLocale = () => ''; // Minimal implementation for getting the current locale
  }
  
  export default I18n;
  