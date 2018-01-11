##数据库说明（weather）

- - -

###数据库包含一张表（Record） 字段如下：

````
city varchar(25) not null primary key  -------用于记录所在的城市名
weather_info varchar(9999) not null   --------用于存放从天气网站API获取到的天气信息
outtime  datetime not null        ------------次字段存放数据的过期时间，过期数据将会被删除
````
       


    
    
