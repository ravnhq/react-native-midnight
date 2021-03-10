package com.reactnativemidnight

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import java.text.SimpleDateFormat
import java.util.*

class MidnightModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener {
  override fun getName(): String {
    return "Midnight"
  }

  private var date = Date()

  private fun isSameDay(date1: Date, date2: Date): Boolean {
    val fmt = SimpleDateFormat("yyyyMMdd")
    return fmt.format(date1) == fmt.format(date2)
  }

  private fun sendDayChangedEvent() {
    reactContext.getJSModule(RCTDeviceEventEmitter::class.java).emit("Midnight_dayChanged", null)
  }

  private val midnightBroadcastReceiver: BroadcastReceiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
      val currentDate = Date()

      if(!isSameDay(date, currentDate)) {
        date = currentDate
        sendDayChangedEvent()
      }
    }
  }

  private fun registerBroadcastReceiver() {
    val filter = IntentFilter().apply {
      addAction(Intent.ACTION_TIME_CHANGED)
      addAction(Intent.ACTION_DATE_CHANGED)
      addAction(Intent.ACTION_TIMEZONE_CHANGED)
    }

    reactContext.registerReceiver(midnightBroadcastReceiver, filter)
  }

  override fun onHostResume() {}
  override fun onHostPause() {}
  override fun onHostDestroy() {
    reactContext.unregisterReceiver(midnightBroadcastReceiver)
  }

  init {
    registerBroadcastReceiver()
  }

  @Suppress("unused")
  @ReactMethod
  fun triggerDayChangedEvent() {
    sendDayChangedEvent()
  }
}