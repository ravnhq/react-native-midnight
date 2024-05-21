/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable unicorn/prefer-module */
import { NativeEventEmitter } from "react-native"

describe("Midnight", () => {
  beforeEach(() => {
    jest.clearAllMocks() // Clear all mocks before each test
  })

  test("creates native event emitter", () => {
    require("../Midnight")
    const { NativeMidnight } = require("../native-midnight")
    expect(NativeEventEmitter).toHaveBeenCalledWith(NativeMidnight)
  })

  test("addListener calls the NativeEventEmitter's addListener method with correct event type and callback", () => {
    const { addListener } = require("../Midnight").default
    const { NativeMidnight } = require("../native-midnight")
    const callback = jest.fn()

    // Call the addListener function
    const listener = addListener(callback)

    // Check that the addListener method of NativeMidnight was called with the correct event type
    expect(NativeMidnight.addListener).toHaveBeenCalledWith(
      "Midnight_dayChanged",
    )

    // Check that the callback was passed correctly
    expect(NativeMidnight.addListener).toHaveBeenCalledTimes(1)

    // Check that the returned listener has a remove method
    expect(listener).toHaveProperty("remove")
  })

  test.todo("errors when attempting to use on unsupported platform")
  test.todo("errors when the NativeModule is null")
  test.todo("useOnDayChange registers event listener")
  test.todo("useOnDayChange removes event listener on unmount")
})
