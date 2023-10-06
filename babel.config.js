module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            "@components": "./components",
            "@projects": "./projects",
            "@assets": "./assets",
            "@constants": "./constants",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  }
}
