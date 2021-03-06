/*
Navicat MySQL Data Transfer

Source Server         : loooooo
Source Server Version : 50610
Source Host           : localhost:3306
Source Database       : weather

Target Server Type    : MYSQL
Target Server Version : 50610
File Encoding         : 65001

Date: 2018-01-11 20:47:21
*/
use weather;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for result
-- ----------------------------
DROP TABLE IF EXISTS `result`;
CREATE TABLE `result` (
  `city_name` varchar(255) NOT NULL,
  `weather_info` varchar(9999) NOT NULL,
  `outtime` datetime NOT NULL,
  PRIMARY KEY (`city_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


SET GLOBAL event_scheduler = 1;
-- 虽然这里用set global event_scheduler = on语句开启了事件，但是每次重启电脑。
-- 或重启mysql服务后，会发现，事件自动关闭（event_scheduler=OFF），
-- 所以想让事件一直保持开启，最好修改配置文件，让mysql服务启动的时候开启时间，
-- 只需要在my.ini配置文件的[mysqld]部分加上event_scheduler=ON 即可

-- ----------------------------
-- Records of result
-- ----------------------------

-- ----------------------------
-- Event structure for time_delete
-- ----------------------------
DROP EVENT IF EXISTS `time_delete`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` EVENT `time_delete` ON SCHEDULE EVERY 1 SECOND STARTS '2018-01-11 20:40:21' ON COMPLETION NOT PRESERVE ENABLE DO delete from result where outtime <  (CURRENT_TIMESTAMP())
;;
DELIMITER ;
