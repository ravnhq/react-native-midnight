const baseConfig = require("@ravnhq/prettier-config")

module.exports = {
  ...baseConfig,
  plugins: [require("@trivago/prettier-plugin-sort-imports")],
  importOrder: ["^@components/(.*)$", "^@utils/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
