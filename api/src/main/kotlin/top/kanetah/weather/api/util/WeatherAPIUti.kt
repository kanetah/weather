package top.kanetah.weather.api.util

import org.apache.http.util.EntityUtils
import top.kanetah.weather.api.entity.Result
import java.sql.Timestamp
import java.util.HashMap

object WeatherAPIUti {

    private val logger = org.apache.log4j.Logger.getLogger(WeatherAPIUti::class.java)

    /**
     * 获取阿里天气API的信息
     * @param cityName 城市名
     * @return 构造完的result
     */
    fun getAPIResult(cityName: String): Result {
        val weatherInfo = getCityName(cityName) ?: throw NullPointerException()
        val outTime = Timestamp(TimeUtil.nextHourMillis)
        val result = Result()
        result.cityName = cityName
        result.outtime = outTime
        result.weatherInfo = weatherInfo
        return result
    }

    private fun getCityName(cityName: String): String? =
            getAPIInfo(cityName) ?: getCityName(cityName.substring(0, cityName.length - 1))

    private fun getAPIInfo(cityName: String): String? {

        val host = "http://jisutqybmf.market.alicloudapi.com"
        val path = "/weather/query"
        val method = "GET"
        val appcode = "e91a5396a2ea447784cdae0644eea635"
        val headers = HashMap<String, String>()
        headers.put("Authorization", "APPCODE $appcode")
        val querys = HashMap<String, String>()
        querys.put("city", cityName)

        /**
         * 重要提示如下:
         * HttpUtils请从
         * https://github.com/aliyun/api-gateway-demo-sign-java/blob/master/src/main/java/com/aliyun/api/gateway/demo/util/HttpUtils.java
         * 下载
         *
         * 相应的依赖请参照
         * https://github.com/aliyun/api-gateway-demo-sign-java/blob/master/pom.xml
         */
        val response = HttpUtils.doGet(host, path, method, headers, querys)
        val jsonInfo = EntityUtils.toString(response.entity)
        if (jsonInfo == "{\"status\":\"202\",\"msg\":\"城市不存在\",\"result\":\"\"}")
            return null
        println("json   $jsonInfo")
        return jsonInfo
    }
}
