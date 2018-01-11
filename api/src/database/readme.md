##数据库说明（weather）

- - -

###数据库包含一张表（Record） 字段如下：

````
city varchar(25) not null primary key  -------用于记录所在的城市名
weather_info varchar(9999) not null   --------用于存放从天气网站API获取到的天气信息
outtime  datetime not null        ------------次字段存放数据的过期时间，过期数据将会被删除
````

###weather_info JSON字段说明
![](https://oss.aliyuncs.com/netmarket/product/720b4231-77c8-4222-aff3-fefd8e159607.png)
- - -
![](https://oss.aliyuncs.com/netmarket/product/6834a65b-b658-48cb-8642-bb31d8830d92.png)
- - - 
![](https://oss.aliyuncs.com/netmarket/product/2ce0d206-c03b-44c4-8c65-8a4e60eb8176.png)  
- - - 
![](https://oss.aliyuncs.com/netmarket/product/9e023dfb-23c3-4e70-a700-63429bd7d654.png)
