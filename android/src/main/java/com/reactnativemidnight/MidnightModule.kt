package com.reactnativemidnight

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.text.SimpleDateFormat
import java.util.*

class MidnightModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "Midnight"
    }

    private fun sendEvent(eventName: String, data: Any?) {
        val reactApplicationContext = reactApplicationContext ?: return
        reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(eventName, data)
    }

    private var date = Date()
    private val dateFormat by lazy { SimpleDateFormat("yyMMdd", Locale.getDefault()) }

    override fun onReceive(context: Context, intent: Intent) {
        val action = intent.action

        val currentDate = Date()

        if ((action == Intent.ACTION_TIME_CHANGED || action == Intent.ACTION_TIMEZONE_CHANGED) && !isSameDay(currentDate)) {
            date = currentDate
            onDayChanged()
        }
    }

    private fun isSameDay(currentDate: Date) = dateFormat.format(currentDate) == dateFormat.format(date)

    fun onDayChanged() {
        sendEvent("dayChanged", null)
    }

    companion object {

        /**
         * Create the [IntentFilter] for the [DayChangedBroadcastReceiver].
         *
         * @return The [IntentFilter]
         */
        fun getIntentFilter() = IntentFilter().apply {
            addAction(Intent.ACTION_TIME_TICK)
            addAction(Intent.ACTION_TIMEZONE_CHANGED)
            addAction(Intent.ACTION_TIME_CHANGED)
        }
    }
}
