package top.kanetah.weather.api.controller

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.logging.Level
import java.util.logging.LogRecord
import java.util.logging.Logger
import javax.websocket.server.PathParam

/**
 * created by kane on 2018/1/10
 */
@RestController
@RequestMapping(value = ["/test"])
class TestController {

    private val logger = Logger.getLogger("TestController")!!

    @RequestMapping(method = [RequestMethod.GET])
    fun getTest(): List<Any> {
        logger.log(LogRecord(Level.INFO, "get: /test"))
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
        logger.log(LogRecord(Level.INFO, "insert: /test"))
    }

    @RequestMapping(value = ["/{id}"], method = [RequestMethod.DELETE])
    fun delete(
            @PathParam("id") id: String
    ) {
        logger.log(LogRecord(Level.INFO, "delete: /test by id $id"))
    }

    @RequestMapping(method = [RequestMethod.PUT])
    fun update(
            @RequestParam id: String
    ) {
        logger.log(LogRecord(Level.INFO, "update: /test"))
    }

    @RequestMapping(value = ["/{id}"], method = [RequestMethod.DELETE])
    fun find(
            @PathParam("id") id: String
    ) {
        logger.log(LogRecord(Level.INFO, "find: /test by id $id"))
    }
}