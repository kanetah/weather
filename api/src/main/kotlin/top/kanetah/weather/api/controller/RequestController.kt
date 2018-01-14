package top.kanetah.weather.api.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import top.kanetah.weather.api.dao.ResultDao
import top.kanetah.weather.api.entity.Result
import top.kanetah.weather.api.util.WeatherAPIUti

@RestController
@CrossOrigin(origins = ["*"])
class RequestController(@Autowired val resultDao: ResultDao) {

    @RequestMapping(value = ["/weather/{city}"], method = [RequestMethod.GET])
    internal fun getWeatherInfo(
            @PathVariable("city") city: String
    ): String? {
        var result: Result? = resultDao.findOne(city)
        if (result == null) {
            result = WeatherAPIUti.getAPIResult(city)
            resultDao.save(result)
        }
        return result.weatherInfo
    }
}
