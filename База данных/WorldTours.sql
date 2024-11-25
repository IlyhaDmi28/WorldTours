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

INSERT INTO TourTypes (Name, Image) VALUES ('Отдых на море', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/TourTypes/sea.svg'));
INSERT INTO TourTypes (Name, Image) VALUES ('Горнолыжный курорт', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/TourTypes/ski.svg'));
INSERT INTO TourTypes (Name, Image) VALUES ('Путешествия по природе', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/TourTypes/nature.svg'));
INSERT INTO TourTypes (Name, Image) VALUES ('Культурный туризм', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/TourTypes/culture.svg'));
INSERT INTO TourTypes (Name, Image) VALUES ('Обычная поездка', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/TourTypes/bus.svg'));

SELECT * FROM TourTypes;

DROP TABLE CharacteristicTypes;
CREATE TABLE CharacteristicTypes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO CharacteristicTypes (Name) VALUES ('Расположение');
INSERT INTO CharacteristicTypes (Name) VALUES ('В номере');
INSERT INTO CharacteristicTypes (Name) VALUES ('В отеле');

SELECT * FROM characteristictypes;
SELECT * FROM TourTypes;
SELECT * FROM characteristics;

CREATE TABLE Characteristics (
  	ID INT PRIMARY KEY AUTO_INCREMENT,
  	CharacteristicTypeID INT,
  	NAME VARCHAR(255) UNIQUE NOT NULL,
	FOREIGN KEY (`CharacteristicTypeID`) REFERENCES `CharacteristicTypes`(`ID`)
);

INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Пляж рядом', 1);
INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('За городом', 1);
INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Лес рядом', 1);
INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Горы рядом', 1);
INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Зимняя природа', 1);
INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Исторический центр рядом', 1);

INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Наличие Wi-fi', 2);
INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Раздельные кровати', 2);
INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Раздельный санузел', 2);

INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Бассейн', 3);
INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Джакузи', 3);
INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Дискотеки', 3);
INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Бильярд', 3);
INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Тенис', 3);
INSERT INTO Characteristics (NAME, CharacteristicTypeID) VALUES ('Различные развлечения', 3);

      

DROP TABLE Charcteristics_TourTypes;
CREATE TABLE Charcteristics_TourTypes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  CharacteristicID INT,
  TourTypeID INT,
  FOREIGN KEY (`CharacteristicID`) REFERENCES `Characteristics`(`ID`),
  FOREIGN KEY (`TourTypeID`) REFERENCES `TourTypes`(`ID`)
);


SELECT * FROM TourTypes;
SELECT * FROM characteristics;

INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (1, 1);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (1, 7);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (1, 8);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (1, 9);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (1, 10);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (1, 11);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (1, 12);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (1, 13);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (1, 14);

INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (2, 7);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (2, 8);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (2, 9);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (2, 15);

INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (3, 2);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (3, 3);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (3, 4);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (3, 5);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (3, 7);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (3, 8);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (3, 9);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (3, 15);

INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (4, 6);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (4, 7);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (4, 8);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (4, 9);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (4, 15);

INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (5, 7);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (5, 8);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (5, 9);
INSERT INTO Charcteristics_TourTypes (TourTypeID, CharacteristicID) VALUES (5, 15);

SELECT * FROM Charcteristics_TourTypes;


