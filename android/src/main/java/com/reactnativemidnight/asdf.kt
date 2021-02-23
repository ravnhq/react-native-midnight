/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.react.modules.appstate

import com.facebook.fbreact.specs.NativeAppStateSpec
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WindowFocusChangeListener
import com.facebook.react.bridge.WritableMap
import com.facebook.react.common.LifecycleState
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import java.util.HashMap

@ReactModule(name = AppStateModule.NAME)
class AppStateModule(reactContext: ReactApplicationContext) : NativeAppStateSpec(reactContext), LifecycleEventListener, WindowFocusChangeListener {

    private var mAppState: String? = null

    init {
        reactContext.addLifecycleEventListener(this)
        reactContext.addWindowFocusChangeListener(this)
        mAppState = if (reactContext.lifecycleState == LifecycleState.RESUMED)
            APP_STATE_ACTIVE
        else
            APP_STATE_BACKGROUND
    }

    override fun getName(): String {
        return NAME
    }

    public override fun getTypedExportedConstants(): Map<String, Any> {
        val constants = HashMap<String, Any>()
        constants[INITIAL_STATE] = mAppState
        return constants
    }

    override fun getCurrentAppState(success: Callback, error: Callback) {
        success.invoke(createAppStateEventMap())
    }

    override fun onHostResume() {
        mAppState = APP_STATE_ACTIVE
        sendAppStateChangeEvent()
    }

    override fun onHostPause() {
        mAppState = APP_STATE_BACKGROUND
        sendAppStateChangeEvent()
    }

    override fun onHostDestroy() {
        // do not set state to destroyed, do not send an event. By the current implementation, the
        // catalyst instance is going to be immediately dropped, and all JS calls with it.
    }

    override fun onWindowFocusChange(hasFocus: Boolean) {
        sendEvent("appStateFocusChange", hasFocus)
    }

    private fun createAppStateEventMap(): WritableMap {
        val appState = Arguments.createMap()
        appState.putString("app_state", mAppState)
        return appState
    }

    private fun sendEvent(eventName: String, data: Any?) {
        val reactApplicationContext = reactApplicationContext ?: return

// We don't gain anything interesting from logging here, and it's an extremely common
        // race condition for an AppState event to be triggered as the Catalyst instance is being
        // set up or torn down. So, just fail silently here.
        if (!reactApplicationContext.hasActiveCatalystInstance()) {
            return
        }
        reactApplicationContext.getJSModule(RCTDeviceEventEmitter::class.java).emit(eventName, data)
    }

    private fun sendAppStateChangeEvent() {
        sendEvent("appStateDidChange", createAppStateEventMap())
    }

    override fun addListener(eventName: String) {
        // iOS only
    }

    override fun removeListeners(count: Double) {
        // iOS only
    }

    companion object {
        val TAG = AppStateModule::class.java.simpleName

        val NAME = "AppState"

        val APP_STATE_ACTIVE = "active"
        val APP_STATE_BACKGROUND = "background"

        private val INITIAL_STATE = "initialAppState"
    }
}
