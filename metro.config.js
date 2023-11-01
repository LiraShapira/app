// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
 // Adds support for `mjs` files 
config.resolver.sourceExts.push('mjs' ); 

module.exports = config;
