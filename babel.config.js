module.exports = function (api) {
  api.cache(true);
  return {
    env: {
      test: {
        plugins: ["@babel/plugin-transform-modules-commonjs"]
      }
    },
    presets: ['babel-preset-expo'],
    plugins: [
      require.resolve('expo-router/babel'),
      [
        'module-resolver',
        {
          alias: {
            components: './components',
            constants: './constants',
          },
        },
      ],
    ],
  };
};
