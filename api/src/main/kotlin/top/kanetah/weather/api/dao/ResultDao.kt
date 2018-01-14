package top.kanetah.weather.api.dao

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import top.kanetah.weather.api.entity.Result

import javax.persistence.Table

@Repository
@Table(name = "result")
@Qualifier("ResultDao")
interface ResultDao : CrudRepository<Result, String> {

    override fun findOne(cityName: String): Result

    override fun <S : Result> save(entity: S): S
}
