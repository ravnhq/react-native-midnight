import { NativeEventEmitter } from "react-native"

test("creates native event emitter", () => {
  // eslint-disable-next-line unicorn/prefer-module
  require("../midnight")
  // eslint-disable-next-line unicorn/prefer-module
  const { NativeMidnight } = require("../native-midnight") // eslint-disable-line @typescript-eslint/no-var-requires
  expect(NativeEventEmitter).toHaveBeenCalledWith(NativeMidnight)
})

test.todo("errors when attempting to use on unsupported platform")
test.todo("errors when the NativeModule is null")
test.todo(
  "addListener calls the NativeEventEmitter's add listener method with correct event type and callback",
)
test.todo("useOnDayChange registers event listener")
test.todo("useOnDayChange removes event listener on unmount")
