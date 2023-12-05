module.exports = {
    preset: "jest-expo",
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    },
    globals: {
      "ts-jest": {
        transformerConfig: {
          transformIgnorePatterns: [
            "./node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)",
            "jest-runner",
          ],
        },
      },
    },
    testPathIgnorePatterns: [
      "./node_modules/",
      "@react-native",
    ],
    testEnvironment: "react-native",
  };