package top.kanetah.weather.api.entity

import javax.persistence.*
import java.io.Serializable
import java.sql.Timestamp

@Entity
@Table(name = "result")
class Result : Serializable {
    @get:Id
    @get:Column(name = "city_name", nullable = false, length = 255)
    var cityName: String? = null
    @get:Basic
    @get:Column(name = "weather_info", nullable = false, length = 9999)
    var weatherInfo: String? = null
    @get:Basic
    @get:Column(name = "outtime", nullable = false)
    var outtime: Timestamp? = null

    override fun equals(o: Any?): Boolean {
        if (this === o) return true
        if (o == null || javaClass != o.javaClass) return false

        val result = o as Result?

        if (if (cityName != null) cityName != result!!.cityName else result!!.cityName != null) return false
        if (if (weatherInfo != null) weatherInfo != result.weatherInfo else result.weatherInfo != null) return false
        return if (if (outtime != null) !outtime!!.equals(result.outtime) else result.outtime != null) false else true

    }

    override fun hashCode(): Int {
        var result = if (cityName != null) cityName!!.hashCode() else 0
        result = 31 * result + if (weatherInfo != null) weatherInfo!!.hashCode() else 0
        result = 31 * result + if (outtime != null) outtime!!.hashCode() else 0
        return result
    }

    override fun toString(): String {
        return "Result{" +
                "cityName='" + cityName + '\'' +
                ", weatherInfo='" + weatherInfo + '\'' +
                ", outtime=" + outtime +
                '}'
    }
}
