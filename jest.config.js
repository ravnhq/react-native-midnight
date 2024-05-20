module.exports = {
  preset: "react-native",
  setupFiles: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  // transformIgnorePatterns: [
  //   'node_modules/(?!(react-native/Libraries/EventEmitter|@react-native|react-native/Libraries/polyfills)/)',
  // ],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation)/)", // Adjust pattern
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/example/node_modules",
    "<rootDir>/lib/",
  ],
  collectCoverageFrom: ["./src/**/*.{ts,tsx}"],
}
