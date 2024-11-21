SELECT VERSION();

DROP TABLE Roles;
CREATE TABLE `Roles` (
  `ID` TINYINT PRIMARY KEY AUTO_INCREMENT,
  `Name` VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO Roles (`Name`) VALUES ('Пользователь');
INSERT INTO Roles (`Name`) VALUES ('Менеджер');
INSERT INTO Roles (`Name`) VALUES ('Администратор');

SELECT * FROM Roles;


CREATE TABLE `Users` (
  `ID` INT PRIMARY KEY AUTO_INCREMENT,
  `Email` VARCHAR(255) UNIQUE NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Role` TINYINT DEFAULT 1,
  `BlockedStatus` BOOLEAN DEFAULT 0,
  `Name` VARCHAR(255),
  `Surname` VARCHAR(255),
  `PhoneNumber` VARCHAR(255),
  `Photo` BLOB,
  FOREIGN KEY (`Role`) REFERENCES `Roles`(`ID`)
);

SELECT * FROM users;


CREATE TABLE TourTypes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(255) UNIQUE NOT NULL
);

SELECT * FROM TourTypes;


CREATE TABLE CharcteristicTypes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(255) UNIQUE NOT NULL
);

SELECT * FROM CharcteristicTypes;


CREATE TABLE Charcteristics (
  	ID INT PRIMARY KEY AUTO_INCREMENT,
  	CharcteristicTypeID INT,
  	NAME VARCHAR(255) UNIQUE NOT NULL,
	FOREIGN KEY (`CharcteristicTypeID`) REFERENCES `CharcteristicTypes`(`ID`)
);

SELECT * FROM Charcteristics;


CREATE TABLE Charcteristics_TourTypes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  CharcteristicID INT,
  TourTypeID INT,
  FOREIGN KEY (`CharcteristicID`) REFERENCES `Charcteristics`(`ID`),
  FOREIGN KEY (`TourTypeID`) REFERENCES `TourTypes`(`ID`),
);

SELECT * FROM Charcteristics_TourTypes;


