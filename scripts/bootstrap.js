const path = require("node:path")
const child_process = require("node:child_process")

const root = path.resolve(__dirname, "..")
const args = process.argv.slice(2)
const options = {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
  encoding: "utf8",
}

const result =
  process.cwd() !== root || args.length > 0
    ? child_process.spawnSync("yarn", args, options)
    : child_process.spawnSync("yarn", ["bootstrap"], options)

process.exitCode = result.status
