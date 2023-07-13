/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100421
 Source Host           : localhost:3306
 Source Schema         : iot

 Target Server Type    : MySQL
 Target Server Version : 100421
 File Encoding         : 65001

 Date: 03/11/2022 21:26:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sensor
-- ----------------------------
DROP TABLE IF EXISTS `sensor`;
CREATE TABLE `sensor`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tanggal` timestamp NULL DEFAULT NULL,
  `jarak` float NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 99 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
