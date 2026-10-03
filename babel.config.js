module.exports = function (api) {
  api.cache(true);

  return {
    // babel-preset-expo adds react-native-worklets/plugin for Reanimated 4.
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./app'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@styles': ['./app/_styles'],
            '@customs': ['./customs'],
            '@components': ['./app/components'],
            '@screens': ['./app/screens'],
            '@boot': './boot',
          },
        },
      ],
    ],
  };
};
