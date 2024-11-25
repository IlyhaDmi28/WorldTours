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

DROP TABLE Users;
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

INSERT INTO Users (Email, PASSWORD, ROLE, BlockedStatus, NAME, Surname, PhoneNumber, Photo) VALUES ('admin@gmail.com', '1234', 3, 0, 'Admin', 'Admin', '+375333333333', NULL);
INSERT INTO Users (Email, PASSWORD, ROLE, BlockedStatus, NAME, Surname, PhoneNumber, Photo) VALUES ('manager@gmail.com', '1234', 2, 0, 'Manager', 'Manager', '+375444444444', NULL);
INSERT INTO Users (Email, PASSWORD, ROLE, BlockedStatus, NAME, Surname, PhoneNumber, Photo) VALUES ('mondaxfeall1@gmail.com', '1234', 1, 0, 'Илья', 'Дмитрук', '+375336461866', null);

SELECT * FROM users;


CREATE TABLE TourTypes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(255) UNIQUE NOT NULL
);

ALTER TABLE TourTypes ADD COLUMN Images BLOB;

INSERT INTO TourTypes (Name, Image) VALUES ('Отдых на море', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/TourTypes/sea.svg'));
INSERT INTO TourTypes (Name, Image) VALUES ('Горнолыжный курорт', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/TourTypes/ski.svg'));
INSERT INTO TourTypes (Name, Image) VALUES ('Путешествия по природе', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/TourTypes/nature.svg'));
INSERT INTO TourTypes (Name, Image) VALUES ('Культурный туризм', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/TourTypes/culture.svg'));
INSERT INTO TourTypes (Name, Image) VALUES ('Обычная поездка', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/TourTypes/bus.svg'));

SELECT * FROM TourTypes;

DROP TABLE
CREATE TABLE CharacteristicsTypes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO CharacteristicsTypes (Name) VALUES ('Расположение');
INSERT INTO CharacteristicsTypes (Name) VALUES ('В номере');
INSERT INTO CharacteristicsTypes (Name) VALUES ('В отеле');

SELECT * FROM Characteristicstypes;

DROP TABLE Characteristics;
CREATE TABLE Characteristics (
  	ID INT PRIMARY KEY AUTO_INCREMENT,
  	CharcteristicTypeID INT,
  	NAME VARCHAR(255) UNIQUE NOT NULL,
	FOREIGN KEY (`CharcteristicTypeID`) REFERENCES `CharcteristicTypes`(`ID`)
);

INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('Пляж рядом', 1);
INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('За городом', 1);
INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('Горы рядом', 1);
INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('Лес рядом', 1);
INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('Зимняя природа', 1);
INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('Исторический центр рядом', 1);
INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('Наличие Wi-fi', 2);
INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('Раздельные кровати', 2);
INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('Раздельный санузел', 2);
INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('Бассейн', 3);
INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('Джакузи', 3);
INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('Бильярд', 3);
INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('Тенис', 3);
INSERT INTO Characteristics (Name, CharcteristicTypeID) VALUES ('Различные развлечения', 3);

SELECT * FROM Characteristics;

SELECT * FROM TourTypes;
DROP TABLE Characteristics_TourTypes;
CREATE TABLE Characteristics_TourTypes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  CharcteristicID INT,
  TourTypeID INT,
  FOREIGN KEY (`CharcteristicID`) REFERENCES `Charcteristics`(`ID`),
  FOREIGN KEY (`TourTypeID`) REFERENCES `TourTypes`(`ID`)
);

INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (1, 1);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (1, 7);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (1, 8);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (1, 9);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (1, 10);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (1, 11);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (1, 11);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (1, 12);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (1, 13);

INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (2, 7);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (1, 8);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (1, 9);
INSERT INTO Characteristics_tourtypes (TourTypeID, CharcteristicID) VALUES (1, 14);

INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (3, 2);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (3, 3);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (3, 4);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (3, 5);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (3, 7);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (3, 8);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (3, 9);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (3, 14);

INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (4, 7);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (4, 8);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (4, 9);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (4, 14);

INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (4, 6);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (4, 7);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (4, 8);
INSERT INTO Characteristics_TourTypes (TourTypeID, CharcteristicID) VALUES (4, 9);
INSERT INTO Characteristics_tourtypes (TourTypeID, CharcteristicID) VALUES (4, 14);

SELECT * FROM Charcteristics_TourTypes;


