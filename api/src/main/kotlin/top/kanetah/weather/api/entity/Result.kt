package top.kanetah.weather.api.entity

import javax.persistence.*
import java.io.Serializable
import java.sql.Timestamp

@Entity
@Table(name = "result")
open class Result : Serializable {
    @get:Id
    @get:Column(name = "city_name", nullable = false, length = 255)
    var cityName: String? = null
    @get:Basic
    @get:Column(name = "weather_info", nullable = false, length = 9999)
    var weatherInfo: String? = null
    @get:Basic
    @get:Column(name = "outtime", nullable = false)
    var outtime: Timestamp? = null

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Result) return false

        if (cityName != other.cityName) return false
        if (weatherInfo != other.weatherInfo) return false
        if (outtime != other.outtime) return false

        return true
    }

    override fun hashCode(): Int {
        var result = cityName?.hashCode() ?: 0
        result = 31 * result + (weatherInfo?.hashCode() ?: 0)
        result = 31 * result + (outtime?.hashCode() ?: 0)
        return result
    }

    override fun toString(): String {
        return "Result(cityName=$cityName, weatherInfo=$weatherInfo, outtime=$outtime)"
    }
}
