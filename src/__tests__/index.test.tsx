import { NativeEventEmitter, NativeModules } from 'react-native'

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () =>
  jest.fn(),
)

const Midnight = {}
NativeModules.Midnight = Midnight

test.todo('errors when attempting to use on unsupported platform')
test.todo('errors when the NativeModule is null')

test('creates native event emitter', () => {
  require('../Midnight')
  const { NativeMidnight } = require('../NativeMidnight')
  expect(NativeEventEmitter).toHaveBeenCalledWith(NativeMidnight)
})

test.todo(
  "addListener calls the NativeEventEmitter's add listener method with correct event type and callback",
)

test.todo('useOnDayChange registers event listener')
test.todo('useOnDayChange removes event listener on unmount')
