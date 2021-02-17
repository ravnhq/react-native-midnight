import { NativeModules } from 'react-native'

type MidnightType = {
  multiply(a: number, b: number): Promise<number>
  subscribe(): void
  unsubscribe(): void
  postNotification(): void
}

const { Midnight } = NativeModules

export default Midnight as MidnightType
