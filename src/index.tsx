import { NativeModules } from 'react-native'

type MidnightType = {
  postNotification(): void
}

const { Midnight } = NativeModules

export default Midnight as MidnightType
