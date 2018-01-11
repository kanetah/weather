package top.kanetah.weather.api.controller

import org.apache.log4j.Logger
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.websocket.server.PathParam

/**
 * created by kane on 2018/1/10
 */
@RestController
@RequestMapping(value = ["/test"])
class TestController {

    private val logger = Logger.getLogger(TestController::class.java)

    @RequestMapping(method = [RequestMethod.GET])
    fun getTest(): List<Any> {
        logger.info("get: /test")
        return listOf(
                "nico",
                "poi",
                "duang"
        )
    }

    @RequestMapping(method = [RequestMethod.POST])
    fun insert(
            @RequestParam id: String
    ) {
        logger.info("insert: /test")
    }

    @RequestMapping(value = ["/{id}"], method = [RequestMethod.DELETE])
    fun delete(
            @PathParam("id") id: String
    ) {
        logger.info("delete: /test by id $id")
    }

    @RequestMapping(method = [RequestMethod.PUT])
    fun update(
            @RequestParam id: String
    ) {
        logger.info("update: /test")
    }

    @RequestMapping(value = ["/{id}"], method = [RequestMethod.GET])
    fun find(
            @PathParam("id") id: String
    ) {
        logger.info("find: /test by id $id")
    }
}
