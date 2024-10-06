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
-- ROLE TABLE DATA
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
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pseudo` varchar(100) NOT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  KEY `FK_c28e52f758e7bbc53828db92194` (`roleId`),
  CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Insertion de 5 utilisateurs, dont un admin
-- INSERT INTO `user` (`id`, `email`, `password`, `pseudo`, `roleId`) 
-- VALUES 
--   (UUID(), 'admin-tie-time@gmail.com.com', 'hashed_password_admin', 'admin_user', 1), -- Admin
--   (UUID(), 'user1@example.com', 'hashed_password_user1', 'user_one', 2),   -- User 
--   (UUID(), 'user2@example.com', 'hashed_password_user2', 'user_two', 2),   -- User 
--   (UUID(), 'user3@example.com', 'hashed_password_user3', 'user_three', 2), -- User 
--   (UUID(), 'user4@example.com', 'hashed_password_user4', 'user_four', 2);  -- User

-- -------------------------------------------------------------
-- 
-- -------------------------------------------------------------