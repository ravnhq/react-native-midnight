import { type EventSubscription, NativeModules, Platform } from "react-native"

interface MidnightNativeModule extends EventSubscription {
  triggerDayChangedEvent: () => void
  addListener: () => void
  removeListeners: () => void
}

const NativeMidnight: MidnightNativeModule | undefined = NativeModules.Midnight

if (Platform.OS !== "ios" && Platform.OS !== "android") {
  throw new Error("react-native-midnight is not compatible with this platform")
}

if (!NativeMidnight) {
  // Produce an error if we don't have the native module
  throw new Error(
    `react-native-midnight: NativeModule.Midnight is null. Make sure you have the package linked properly.`,
  )
}

export { NativeMidnight }
