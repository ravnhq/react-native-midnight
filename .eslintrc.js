module.exports = {
  root: true,
  env: {
    jest: true,
  },
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
  extends: [
    "@ravnhq/eslint-config",
    "@ravnhq/eslint-config/react",
    "@ravnhq/eslint-config/react-native",
  ],
  rules: {
    "@typescript-eslint/no-unsafe-assignment": "off",
    "filenames/match-exported": ["warn"],
    "filenames/match-regex": ["warn"],
    "unicorn/prefer-event-target": "off",
  },
}
