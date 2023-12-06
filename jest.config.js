// jest.config.js
export default {
  type: "module",
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '@testing-library/react-native/jest-setup.js',
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
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo-linked|expo-font|expo-constants|expo-localization)',
  ],
};
