package top.kanetah.weather.api.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import top.kanetah.weather.api.dao.ResultDao
import top.kanetah.weather.api.util.WeatherAPIUti

@RestController
@CrossOrigin(origins = ["*"])
class RequestController(@Autowired val resultDao: ResultDao) {

    @RequestMapping(value = ["/weather/{city}"], method = [RequestMethod.GET])
    internal fun getWeatherInfo(
            @PathVariable city: String
    ): String? =
            (resultDao.findOne(city) ?: WeatherAPIUti.let {
                it.getAPIResult(city).let {
                    resultDao.save(it)
                }
            }).weatherInfo
}
