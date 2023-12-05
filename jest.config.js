module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  globals: {
    "ts-jest": {
      babelConfig: true,
      tsconfig: "./tsconfig.json",
    },
  },
  moduleNameMapper: {
    '^i18n-js$': '<rootDir>/path-to-your-mock-file.js',
  },

  testPathIgnorePatterns: [
    "./node_modules/",
    "@react-native",
  ],
  testEnvironment: "node",
};
