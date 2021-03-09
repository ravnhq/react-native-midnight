package com.reactnativemidnight

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.support.v4.content.LocalBroadcastManager
import java.text.SimpleDateFormat
import java.util.*


class MidnightBroadcastReceiver : BroadcastReceiver() {



    override fun onReceive(context: Context, intent: Intent) {
        val action = intent.action

        val currentDate = Date()

        if ((action == Intent.ACTION_TIME_CHANGED || action == Intent.ACTION_TIMEZONE_CHANGED) /*&& !isSameDay(currentDate)*/) {
          val broadcastIntent = Intent(MidnightModule.DAY_CHANGED_ACTION)
          LocalBroadcastManager.getInstance(context).sendBroadcast(broadcastIntent)
        }
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
