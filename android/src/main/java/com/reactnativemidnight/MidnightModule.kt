package com.reactnativemidnight

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.modules.core.DeviceEventManagerModule

class MidnightModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        midnightModuleReactContext = reactContext
    }

    override fun getName(): String {
        return "Midnight"
    }

    fun manuallyTriggerEvent() {
        MidnightModule.onDayChanged()
    }

    companion object {
        private var midnightModuleReactContext: ReactApplicationContext ? = null

        private fun sendEvent(eventName: String, data: Any?) {
            val reactApplicationContext = midnightModuleReactContext ?: return
            reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(eventName, data)
        }

        fun onDayChanged() {
            sendEvent("dayChanged", null)
        }
    }
}
