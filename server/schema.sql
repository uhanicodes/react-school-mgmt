CREATE DATABASE `school2`;

CREATE TABLE `students` (
  `ID` int NOT NULL,
  `Class` int NOT NULL,
  `RollNumber` int NOT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `RollNumber` (`RollNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;