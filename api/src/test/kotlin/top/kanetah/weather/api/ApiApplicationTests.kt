package top.kanetah.weather.api

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import top.kanetah.weather.api.controller.RequestController
import top.kanetah.weather.api.dao.ResultDao
import top.kanetah.weather.api.entity.Result
import top.kanetah.weather.api.util.WeatherAPIUti

@RunWith(SpringRunner::class)
@SpringBootTest
class ApiApplicationTests {


    @Autowired internal val resultDao : ResultDao? = null

    @Test
	fun contextLoads() {

        val cityName = "厦门"
        var result: Result? = resultDao!!.findOne(cityName)
        if (result == null) {
            result = WeatherAPIUti.getAPIResult(cityName)
            resultDao!!.save(result)
        }

        println("test    $result")

	}

}
