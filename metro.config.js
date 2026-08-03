const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");


const config = getDefaultConfig(__dirname);
config.resolver.unstable_enablePackageExports = false;

// Single worker avoids parallel Babel/NativeWind transforms exhausting memory
config.maxWorkers = 1;

module.exports = withNativeWind(config, {
  input: "./src/global.css",
});