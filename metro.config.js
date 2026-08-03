const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Limit parallel workers to avoid OOM during NativeWind/Tailwind transforms
config.maxWorkers = 2;

module.exports = withNativeWind(config, {
  input: "./src/global.css",
});