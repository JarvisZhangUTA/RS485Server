/* MAINTANCE DB */
CREATE DATABASE IF NOT EXISTS `monitor`;
USE `monitor`;

CREATE TABLE IF NOT EXISTS `monitor`.`temp` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `addr` TEXT NULL,
  `number` TEXT NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`));