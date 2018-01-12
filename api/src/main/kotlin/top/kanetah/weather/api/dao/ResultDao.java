package top.kanetah.weather.api.dao;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import top.kanetah.weather.api.entity.Result;

import javax.persistence.Table;

@Repository
@Table(name = "result")
@Qualifier("ResultDao")
public interface ResultDao extends CrudRepository<Result,String> {

    Result findOne(String cityName);

    Result save(Result result);

}
