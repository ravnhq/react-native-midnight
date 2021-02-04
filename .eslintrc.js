module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  extends: [
    '@ravn-dev/eslint-config-ravn/react',
    '@ravn-dev/eslint-config-ravn/react-native',
    '@ravn-dev/eslint-config-ravn/base',
    '@ravn-dev/eslint-config-ravn/jest',
    '@ravn-dev/eslint-config-ravn/typescript',
  ],
  rules: {},
}
