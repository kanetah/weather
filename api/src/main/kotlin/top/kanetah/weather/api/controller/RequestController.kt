package top.kanetah.weather.api.controller


import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import top.kanetah.weather.api.dao.ResultDao
import top.kanetah.weather.api.entity.Result
import top.kanetah.weather.api.util.WeatherAPIUti

@RestController
@EnableAutoConfiguration
class RequestController (@Autowired val resultDao:ResultDao){

    @RequestMapping(name = "/getWeatherInfo", method = [RequestMethod.GET])
    internal fun getWeatherInfo(@RequestParam("cityName") cityName: String):String?{

        var result: Result? = resultDao.findOne(cityName)
        if (result == null) {
            result = WeatherAPIUti.getAPIResult(cityName)
            resultDao.save(result)
        }
        return result!!.weatherInfo

    }
}
