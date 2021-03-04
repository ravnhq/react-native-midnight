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
  throw new Error(`react-native-midnight: NativeModule.Midnight is null. To fix this issue try these steps:
  • For react-native <= 0.59: Run \`react-native link react-native-midnight\` in the project root.
  • Rebuild and re-run the app.
  • If you are using CocoaPods on iOS, run \`pod install\` in the \`ios\` directory and then rebuild and re-run the app. You may also need to re-open Xcode to get the new pods.
  If none of these fix the issue, please open an issue on the Github repository: https://github.com/ravnhq/react-native-midnight`)
}

export { NativeMidnight }
