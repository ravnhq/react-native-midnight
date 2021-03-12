import { Platform, NativeModules, EventSubscriptionVendor } from 'react-native'

interface MidnightNativeModule extends EventSubscriptionVendor {
  triggerDayChangedEvent: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const NativeMidnight: MidnightNativeModule | undefined = NativeModules.Midnight

if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
  throw Error('react-native-midnight is not compatible with this platform')
}

if (!NativeMidnight) {
  // Produce an error if we don't have the native module
  throw new Error(
    `react-native-midnight: NativeModule.Midnight is null. Make sure you have the package linked properly.`,
  )
}

export { NativeMidnight }
