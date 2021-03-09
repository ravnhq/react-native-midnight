package com.reactnativemidnight

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.support.v4.content.LocalBroadcastManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import java.text.SimpleDateFormat
import java.util.*


class MidnightModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  private var date = Date()
  private val dateFormat by lazy { SimpleDateFormat("yyMMdd", Locale.getDefault()) }

  private val localBroadcastManager = LocalBroadcastManager.getInstance(reactContext)
  private val midnightBroadcastReceiver = MidnightBroadcastReceiver()
  private var midnightReceiver: BroadcastReceiver? = object : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
      sendEvent("Hi there!")
    }

  }

  override fun getName(): String {
    return "Midnight"
  }

  fun subscribe() {
    reactApplicationContext.registerReceiver(midnightBroadcastReceiver, MidnightBroadcastReceiver.getIntentFilter())
    midnightReceiver?.let {
      localBroadcastManager.registerReceiver(midnightReceiver, IntentFilter(DAY_CHANGED_ACTION))
    }
  }

  fun unsubscribe() {
    reactApplicationContext.unregisterReceiver(midnightBroadcastReceiver)
    localBroadcastManager.unregisterReceiver(midnightReceiver)
    midnightReceiver = null
  }

  fun manuallyTriggerEvent() {
    sendEvent("HI")
  }

  private fun sendEvent(data: String) {
    reactContext.getJSModule(RCTDeviceEventEmitter::class.java).emit("midnight", data)
  }

  private fun isSameDay(currentDate: Date) = dateFormat.format(currentDate) == dateFormat.format(date)

  companion object {
    const val DAY_CHANGED_ACTION = "day_changed_action"
  }

}
