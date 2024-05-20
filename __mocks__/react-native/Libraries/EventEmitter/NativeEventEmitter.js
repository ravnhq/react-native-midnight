import RCTDeviceEventEmitter from "react-native/Libraries/EventEmitter/RCTDeviceEventEmitter"
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter"

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

export default NativeEventEmitter
