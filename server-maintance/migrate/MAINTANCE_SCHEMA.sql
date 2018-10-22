/* MAINTANCE DB */
CREATE DATABASE IF NOT EXISTS `maintance`;
USE `maintance`;

/* REPLACEMENT TABLE */
CREATE TABLE IF NOT EXISTS `maintance`.`replacement` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `serial_number` VARCHAR(45) NULL,
  `wire_box` VARCHAR(45) NULL,
  `unit_model_rate` VARCHAR(45) NULL,
  `unit_model_type` VARCHAR(45) NULL,
  `old_firmware_dsp` VARCHAR(45) NULL,
  `old_firmware_lcd` VARCHAR(45) NULL,
  `old_firmware_arc` VARCHAR(45) NULL,
  `new_firmware_dsp` VARCHAR(45) NULL,
  `new_firmware_lcd` VARCHAR(45) NULL,
  `new_firmware_arc` VARCHAR(45) NULL,
  `date` DATETIME NULL,
  `rma` VARCHAR(45) NULL,
  `data_log` VARCHAR(45) NULL,
  `count` VARCHAR(45) NULL,
  `jira_mt` VARCHAR(45) NULL,
  `picture1` TEXT NULL,
  `picture2` TEXT NULL,
  `picture3` TEXT NULL,
  `picture4` TEXT NULL,
  `picture5` TEXT NULL,
  `picture6` TEXT NULL,
  `picture7` TEXT NULL,
  `picture8` TEXT NULL,
  `picture9` TEXT NULL,
  `picture10` TEXT NULL,
  `repair_analysis` TEXT NULL,
  `fans_running` TINYINT NULL,
  `fans_inverter_run_time` INT NULL,
  `power_test` TINYINT NULL,
  `afci_test` TINYINT NULL,
  PRIMARY KEY (`id`));
  
  /* REPLACEMENT PARTS */
  CREATE TABLE IF NOT EXISTS `maintance`.`replacement_parts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `replacement_id` int(11) NOT NULL,
  `part_name` varchar(45) DEFAULT NULL,
  `part_number` int(11) DEFAULT NULL,
  `incoming_type` varchar(45) DEFAULT NULL,
  `outgoing_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`));
  
  /* PARTS TABLE */
  DROP TABLE IF EXISTS `maintance`.`parts`;

  CREATE TABLE `maintance`.`parts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
  
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (1, 'ARC Board');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (2, 'DSP Board');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (3, 'Filter Board');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (4, 'Power Board');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (5, 'LCD Board');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (6, 'Wire Board');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (7, 'Cap Board');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (8, 'AC Industor A');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (9, 'AC Industor B');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (10, 'DC Industor A');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (11, 'DC Industor B');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (12, 'AC Switch');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (13, 'DC Switch');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (14, 'Internal Fan');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (15, 'External Fan');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (16, 'Wire Box');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (17, 'Top Cover');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (18, 'WB Cover');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (19, 'Top Blast Bracket');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (20, 'Bottom Blast Bracket');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (21, 'Rear Panel');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (22, 'Left|Right Panel');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (23, 'LCD Display Panel');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (24, 'Clear Plastic Fuse Cover');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (25, 'Fuse Holders|Pullers');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (26, 'xx-pin Communication Cable');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (27, 'Inverter Harness');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (28, 'Power Cables');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (29, 'Bus Cable');
  INSERT INTO `maintance`.`parts` (`id`, `name`) VALUES (30, 'Insulation Sheetparts');

