const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Ignore transient Android native build folders that can disappear while Metro
// is attaching file watchers on Windows, causing the bundler to crash.
config.resolver.blockList = [
    ...(Array.isArray(config.resolver.blockList)
        ? config.resolver.blockList
        : config.resolver.blockList
            ? [config.resolver.blockList]
            : []),
    /android[\\/]app[\\/]\.cxx[\\/].*/,
    /android[\\/]\.gradle[\\/].*/,
];

module.exports = withNativeWind(config, {
    input: "./global.css",
});
