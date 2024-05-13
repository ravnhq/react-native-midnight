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
    // Adding or updating the filenames/match-exported rule
    "filenames/match-exported": ["error", ["pascal", "kebab"]],
  },
}
