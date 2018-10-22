/* USER DB */ 
CREATE DATABASE IF NOT EXISTS `user`;
USE `user`;

CREATE TABLE IF NOT EXISTS `user`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `level_id` INT NULL,
  PRIMARY KEY (`id`));

DROP TABLE IF EXISTS `user`.`levels`;

CREATE TABLE `user`.`levels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) DEFAULT 0,
  `user_add` TINYINT DEFAULT 0,
  `user_edit` TINYINT DEFAULT 0,
  `user_view` TINYINT DEFAULT 0,
  `maintance_add` TINYINT DEFAULT 0,
  `maintance_edit` TINYINT DEFAULT 0,
  `maintance_view` TINYINT DEFAULT 0,
  `monitor_add` TINYINT DEFAULT 0,
  `monitor_edit` TINYINT DEFAULT 0,
  `monitor_view` TINYINT DEFAULT 0,
  PRIMARY KEY (`id`));

INSERT INTO `user`.`levels` 
	(`id`, `name`, `user_add`, `user_edit`, `user_view`, `maintance_add`, `maintance_edit`, 
    `maintance_view`, `monitor_add`, `monitor_edit`, `monitor_view`) 
VALUES 
	(1, 'admin', '1', '1', '1', '1', '1', '1', '1', '1', '1');

INSERT INTO `user`.`levels` 
	(`id`, `name`, `user_add`, `user_edit`, `user_view`, `maintance_add`, `maintance_edit`, 
    `maintance_view`, `monitor_add`, `monitor_edit`, `monitor_view`) 
VALUES 
	(2, 'maintance', '0', '0', '0', '1', '0', '0', '0', '0', '0');

INSERT INTO `user`.`levels` 
	(`id`, `name`, `user_add`, `user_edit`, `user_view`, `maintance_add`, `maintance_edit`, 
    `maintance_view`, `monitor_add`, `monitor_edit`, `monitor_view`) 
VALUES 
	(3, 'monitor', '0', '0', '0', '0', '0', '0', '1', '0', '0');