const EventEmitter =
  require("react-native/Libraries/vendor/emitter/EventEmitter").default
const RCTDeviceEventEmitter =
  require("react-native/Libraries/EventEmitter/RCTDeviceEventEmitter").default

const Platform = {
  OS: "android",
  select: (obj) => obj.android,
}

class NativeEventEmitter extends EventEmitter {
  constructor(nativeModule) {
    super()
    this._nativeModule = nativeModule
  }

  addListener(eventType, listener, context) {
    this._nativeModule?.addListener(eventType)
    let subscription = RCTDeviceEventEmitter.addListener(
      eventType,
      listener,
      context,
    )

    return {
      remove: () => {
        if (subscription != null) {
          this._nativeModule?.removeListeners(1)
          subscription.remove()
          subscription = null
        }
      },
    }
  }

  emit(eventType, ...args) {
    RCTDeviceEventEmitter.emit(eventType, ...args)
  }

  removeAllListeners(eventType) {
    this._nativeModule?.removeListeners(this.listenerCount(eventType))
    RCTDeviceEventEmitter.removeAllListeners(eventType)
  }

  listenerCount(eventType) {
    return RCTDeviceEventEmitter.listenerCount(eventType)
  }
}

const NativeModules = {
  Midnight: {
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  },
}

module.exports = {
  Platform,
  NativeEventEmitter: jest
    .fn()
    .mockImplementation((nativeModule) => new NativeEventEmitter(nativeModule)),
  NativeModules,
  // Mock other react-native exports as needed
}
