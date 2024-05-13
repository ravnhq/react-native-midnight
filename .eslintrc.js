module.exports = {
  root: true,
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
  },
}
