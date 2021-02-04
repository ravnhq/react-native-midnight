import { NativeModules } from 'react-native'

type MidnightType = {
  multiply(a: number, b: number): Promise<number>
}

const { Midnight } = NativeModules

export default Midnight as MidnightType
