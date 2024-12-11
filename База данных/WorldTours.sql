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

SELECT * FROM characteristics;


DROP TABLE Descriptions
CREATE TABLE Descriptions (
  	ID INT PRIMARY KEY AUTO_INCREMENT,
  	Value BOOLEAN DEFAULT 0 NOT NULL,
  	CharacteristicID INT,
  	TourID INT,
	FOREIGN KEY (`CharacteristicID`) REFERENCES `Characteristics`(`ID`),
	FOREIGN KEY (`TourID`) REFERENCES `Tours`(`ID`)
);

CharacteristicID
INSERT INTO Descriptions (Value, CharacteristicID) VALUES (true, 3);
SELECT * FROM Descriptions;     


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

DROP TABLE Regions;
CREATE TABLE Regions (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL,
  Image BLOB,
);

INSERT INTO Regions (Name, Image) VALUES ('Европа и Россия', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/regions/europe.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Ближний Восток', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/regions/middle-east.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Северная Африка', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/regions/north-africa.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Африка', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/regions/africa.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Латинская Америка', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/regions/latin-america.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Северная Америка', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/regions/north-america.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Юго-Восточная Азия', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/regions/south-east-asia.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Центральная Азия', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/regions/central-asia.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Южная Азия', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/regions/south-asia.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Восточная Азия', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/regions/east-asia.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Океания', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/regions/oceania.jpg'));

SELECT Id, Name FROM Regions;

DROP TABLE Countries;
CREATE TABLE Countries (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL,
  Flag BLOB,
  RegionId INT,
  FOREIGN KEY (`RegionId`) REFERENCES `Regions`(`ID`)
);

ALTER TABLE Countries ADD Flag BLOB;

INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Болгария', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/flags/bulgaria.svg'),  1);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Беларусь', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/flags/belarus.svg'),  1);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('ОАЭ', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/flags/uae.svg'),  2);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Тайланд', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/flags/thailand.svg'),  10);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Норвегия', LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/flags/norway.svg'),  1);

UPDATE Countries SET Flag = LOAD_FILE('D:/Univer/Курсач/WorldTours/frontend/src/img/flags/norway.svg') WHERE NAME = 'Норвегия';
UPDATE Countries SET RegionId = 7 WHERE NAME = 'Тайланд';

SELECT * FROM countries;


DROP TABLE Cities;
CREATE TABLE Cities (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL,
  CountryId INT,
  FOREIGN KEY (`CountryId`) REFERENCES `Countries`(`ID`)
);

INSERT INTO Cities (NAME, CountryId) VALUES ('Минск', 2);
INSERT INTO Cities (NAME, CountryId) VALUES ('София', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Варна', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Бургас', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Пловдив', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Дубай', 3);
INSERT INTO Cities (NAME, CountryId) VALUES ('Пхукет', 4);
INSERT INTO Cities (NAME, CountryId) VALUES ('Тронхейм', 5);

SELECT * FROM cities;


DROP TABLE DepartmentDepartures;
CREATE TABLE DepartmentDepartures (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL,
  CityId INT,
  FOREIGN KEY (`CityId`) REFERENCES `Cities`(`ID`)
);

INSERT INTO DepartmentDepartures (NAME, CityId) VALUES ('Автовокщал «Центральный»', 1);
INSERT INTO DepartmentDepartures (NAME, CityId) VALUES ('Национальный аэропорт «Минск»', 1);

SELECT * FROM DepartmentDepartures;

DROP TABLE TransportTypes;
CREATE TABLE TransportTypes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO TransportTypes (NAME) VALUES ('Самолёт');
INSERT INTO TransportTypes (NAME) VALUES ('Автобус');
INSERT INTO TransportTypes (NAME) VALUES ('Корабль');

SELECT * FROM transporttypes;


DROP TABLE Hotels;
CREATE TABLE Hotels (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL,
  StarsNumber INT NOT NULL,
  CityId INT,
  FOREIGN KEY (`CityId`) REFERENCES `Cities`(`ID`)
);

SELECT * FROM cities;
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Чёрный дельфин', 5, 3);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Отель Андрея-гея', 2, 5);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Золотой парус', 5, 6);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Зелёный бриз', 4, 7);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Старая волна', 3, 7);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Северный мир', 4, 8);

SELECT * FROM hotels;


CREATE TABLE NutritionTypes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO NutritionTypes (NAME) VALUES ('RO (Room only) — без питания');
INSERT INTO NutritionTypes (NAME) VALUES ('BB (Bed & breakfast) — завтрак');
INSERT INTO NutritionTypes (NAME) VALUES ('HB (Half board) — полупансион');
INSERT INTO NutritionTypes (NAME) VALUES ('FB (Full board) — полный пансион (завтрак, обед и ужин)');
INSERT INTO NutritionTypes (NAME) VALUES ('AI (All inclusive) — всё включено — завтрак, обед и ужин (шведский стол)');

SELECT * FROM nutritiontypes;

CREATE TABLE Tours (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	Name VARCHAR(255) UNIQUE NOT NULL,
	MainDescription VARCHAR(255),
	TourTypeId INT,
	NutritionTypeId INT,
	HotelId INT,
	Photo BLOB
);

SELECT * FROM Tours;


DROP TABLE routes;
CREATE TABLE Routes (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	LandingDateOfDeparture DATE,
	LandingTimeOfDeparture TIME,
	ArrivalDateOfDeparture DATE,
	ArrivalTimeOfDeparture TIME,
	LandingDateOfReturn DATE,
	LandingTimeOfReturn TIME,
	ArrivalDateOfReturn DATE,
	ArrivalTimeOfReturn TIME,
	Price INT,
	SeatsNumber INT,
	DepartmentDepartureId INT,
	TransportTypeId INT,
	TourId INT,
	FOREIGN KEY (`DepartmentDepartureId`) REFERENCES `DepartmentDepartures`(`ID`),
  	FOREIGN KEY (`TransportTypeId`) REFERENCES `TransportTypes`(`ID`),
  	FOREIGN KEY (`TourId`) REFERENCES `Tours`(`ID`)
);

SELECT * FROM Routes;