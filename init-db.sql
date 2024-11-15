-- -------------------------------------------------------------
-- TablePlus 6.1.2(568)
--
-- https://tableplus.com/
--
-- Database: db_tie_time
-- Generation Time: 2024-10-06 21:57:41.0320
-- -------------------------------------------------------------

-- -------------------------------------------------------------
-- ROLE TABLE STRUCTURE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` enum('user','admin') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- ROLE TABLE INSERTS
-- -------------------------------------------------------------
INSERT INTO `role` (`label`) VALUES ('admin'), ('user');

-- -------------------------------------------------------------
-- 
-- -------------------------------------------------------------

-- -------------------------------------------------------------
-- USER TABLE STRUCTURE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL DEFAULT (UUID()),
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pseudo` varchar(100) NOT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  KEY `FK_c28e52f758e7bbc53828db92194` (`roleId`),
  CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -------------------------------------------------------------
-- USER TABLE INSERTS
-- -------------------------------------------------------------
INSERT INTO `user` (`id`, `email`, `password`, `pseudo`, `roleId`) 
VALUES 
  ('83e94044-a2b6-11ef-9e40-0242ac150002', 'admin-tie-time@gmail.com', '$2a$10$uNA8RW7GMd1OySe5AHtGleNFzwWEti1Sxi4GFAbGZNgku6kLBIJmq', 'admin_user', 1), -- Admin
  ('268b1c99-86d5-11ef-affd-0242ac1c0002', 'user1@gmail.com', '$2a$10$d1CFc.d3oqEQLo4PWJWbzOqG/60CmqeYsktOaIWkVOCwJ5pIxNDxi', 'user_one', 2),   -- User 
  ('83e94322-a2b6-11ef-9e40-0242ac150002', 'user2@gmail.com', '$2a$10$d1CFc.d3oqEQLo4PWJWbzOqG/60CmqeYsktOaIWkVOCwJ5pIxNDxi', 'user_two', 2),   -- User 
  ('83e94374-a2b6-11ef-9e40-0242ac150002', 'user3@gmail.com', '$2a$10$d1CFc.d3oqEQLo4PWJWbzOqG/60CmqeYsktOaIWkVOCwJ5pIxNDxi', 'user_three', 2), -- User 
  ('83e943b9-a2b6-11ef-9e40-0242ac150002', 'user4@gmail.com', '$2a$10$d1CFc.d3oqEQLo4PWJWbzOqG/60CmqeYsktOaIWkVOCwJ5pIxNDxi', 'user_four', 2);  -- User

-- -------------------------------------------------------------
-- 
-- -------------------------------------------------------------

-- -------------------------------------------------------------
-- TASK TABLE STRUCTURE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` varchar(36) NOT NULL,
  `is_checked` tinyint NOT NULL,
  `date` datetime NOT NULL,
  `order` int NOT NULL,
  `createdById` varchar(36) DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9c2b3f6af6404ca9cb1bfe48ba` (`date`,`order`),
  KEY `FK_91d76dd2ae372b9b7dfb6bf3fd2` (`createdById`),
  CONSTRAINT `FK_91d76dd2ae372b9b7dfb6bf3fd2` FOREIGN KEY (`createdById`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -------------------------------------------------------------
-- TASKS TABLE INSERTS
-- -------------------------------------------------------------
INSERT INTO `task` (`id`, `is_checked`, `date`, `order`, `createdById`, `title`, `created_at`, `updated_at`) VALUES
(UUID(), 1, '2024-11-13 00:00:00', 2, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Faire les courses', '2024-11-14 07:02:39.032801', '2024-11-14 07:09:13.000000'),
(UUID(), 1, '2024-11-13 00:00:00', 1, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Laver le linge', '2024-11-14 06:54:47.950575', '2024-11-14 17:52:25.000000'),
(UUID(), 0, '2024-11-07 00:00:00', 1, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Faire les courses', '2024-11-07 06:21:49.232046', '2024-11-13 18:10:49.000000'),
(UUID(), 1, '2024-11-13 00:00:00', 3, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Arroser les plantes', '2024-11-14 07:04:20.103321', '2024-11-14 07:09:08.000000'),
(UUID(), 1, '2024-11-13 00:00:00', 4, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Nourrir le chien', '2024-11-14 07:09:19.365835', '2024-11-14 07:09:21.000000'),
(UUID(), 0, '2024-11-07 00:00:00', 4, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Sortir les poubelles', '2024-11-14 05:59:57.301530', '2024-11-14 05:59:57.301530'),
(UUID(), 0, '2024-10-25 00:00:00', 3, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Faire la vaisselle', '2024-10-25 09:25:11.356147', '2024-10-25 09:25:11.356147'),
(UUID(), 1, '2024-11-07 00:00:00', 2, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Faire la vaisselle', '2024-11-07 06:21:55.035463', '2024-11-14 17:20:41.000000'),
(UUID(), 1, '2024-11-07 00:00:00', 3, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Devenir développeur', '2024-11-07 06:22:00.326999', '2024-11-14 17:20:42.000000'),
(UUID(), 1, '2024-10-25 00:00:00', 1, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Faire la cuisine', '2024-10-25 08:28:00.549079', '2024-11-13 06:18:52.000000');

-- -------------------------------------------------------------
-- 
-- -------------------------------------------------------------

-- -------------------------------------------------------------
-- TYPE RATE TABLE STRUCTURE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `type_rate`;
CREATE TABLE `type_rate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` enum('self-estime','satisfaction') NOT NULL,
  `out_of` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -------------------------------------------------------------
-- TYPE RATE TABLE INSERTS
-- -------------------------------------------------------------
INSERT INTO `type_rate` (`label`, `out_of`) VALUES
('self-estime', 5),
('satisfaction', 5);

-- -------------------------------------------------------------
-- 
-- -------------------------------------------------------------

-- -------------------------------------------------------------
-- RATE TABLE STRUCTURE
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `rate`;
CREATE TABLE `rate` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `score` float(2,1) NOT NULL,
  `date` datetime NOT NULL,
  `createdById` varchar(36) DEFAULT NULL,
  `typeRateId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_fed84aa6480b787c08aaf1b8031` (`createdById`),
  KEY `FK_5e0b57f4155c2ff5ec9602c1678` (`typeRateId`),
  CONSTRAINT `FK_5e0b57f4155c2ff5ec9602c1678` FOREIGN KEY (`typeRateId`) REFERENCES `type_rate` (`id`),
  CONSTRAINT `FK_fed84aa6480b787c08aaf1b8031` FOREIGN KEY (`createdById`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------------------------------------
-- RATE TABLE INSERTS
-- -------------------------------------------------------------

-- NOTTING TO INSERT INTO RATE TABLE FOR THE MOMENT

-- -------------------------------------------------------------
-- 
-- -------------------------------------------------------------

