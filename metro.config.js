const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

console.log("✅ Metro Config Loaded");

module.exports = withNativeWind(config, {
  input: "./src/global.css",
});