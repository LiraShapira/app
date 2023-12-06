// jest.config.cjs
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '/Users/Lenovo/app/mockfile.js',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo-linked|expo-font|expo-constants|expo-localization|@react-native/js-polyfills)',
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.js', '.jsx'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  testEnvironment: 'node', // Add this line
  testRunner: 'jest-circus/runner', // Add this line
};
