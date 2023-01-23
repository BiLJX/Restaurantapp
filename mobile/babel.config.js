module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel",
      'react-native-reanimated/plugin',
      [
        "module-resolver",
        {
            "root": ["./"],
            "alias": {
              "components/*": "./components/",
              "assets/*": "./assets/",
              "screens/*": "./screens/",
              "navigation/*": "./navigation/",
              "api/*": "./api/*",
              "utils/*": "./utils/*",
            },
            "extensions": ['.js', '.ts', '.tsx', '.json']
        }
      ]
    ],
  };
};
