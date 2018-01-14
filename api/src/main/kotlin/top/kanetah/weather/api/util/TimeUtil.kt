package top.kanetah.weather.api.util

import java.util.Calendar

object TimeUtil {

    val nextHourMillis: Long
        get() {

            val calendar = Calendar.getInstance()
            val year = calendar.get(Calendar.YEAR)
            val month = calendar.get(Calendar.MONTH)
            var day = calendar.get(Calendar.DAY_OF_MONTH)
            var hour = calendar.get(Calendar.HOUR_OF_DAY)

            if (hour >= 23) {
                hour = 0
                day++
            } else
                hour++
            calendar.clear()
            calendar.set(year, month, day, hour, 0)
            return calendar.timeInMillis

        }
}
