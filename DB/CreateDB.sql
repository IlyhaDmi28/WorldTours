CREATE TABLE `Roles` (
  `ID` TINYINT PRIMARY KEY AUTO_INCREMENT,
  `Name` VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE `Users` (
  `ID` INT PRIMARY KEY AUTO_INCREMENT,
  `Email` VARCHAR(255) UNIQUE NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Role` TINYINT DEFAULT 1,
  `BlockedStatus` BOOLEAN DEFAULT 0,
  `Name` VARCHAR(255),
  `Surname` VARCHAR(255),
  `PhoneNumber` VARCHAR(255),
  `Photo` LONGBLOB,
  FOREIGN KEY (`Role`) REFERENCES `Roles`(`ID`)
);

CREATE TABLE TourTypes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(255) UNIQUE NOT NULL,
  PathToImage VARCHAR(255)
);

CREATE TABLE Regions (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL,
  PathToImage VARCHAR(255)
);

CREATE TABLE Countries (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL,
  PathToFlag VARCHAR(255),
  RegionId INT,
  FOREIGN KEY (`RegionId`) REFERENCES `Regions`(`ID`)
);

CREATE TABLE Cities (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL,
  CountryId INT,
  FOREIGN KEY (`CountryId`) REFERENCES `Countries`(`ID`)
);

CREATE TABLE TransportTypes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE DepartmentDepartures (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL,
  CityId INT,
  Address VARCHAR(255),
  TransportTypeId INT,
  FOREIGN KEY (`CityId`) REFERENCES `Cities`(`ID`),
  FOREIGN KEY (`TransportTypeId`) REFERENCES `TransportTypes`(`ID`)
);

CREATE TABLE NutritionTypes (
  	ID INT PRIMARY KEY AUTO_INCREMENT,
  	Name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Hotels (
  	ID INT PRIMARY KEY AUTO_INCREMENT,
   Name VARCHAR(255) UNIQUE NOT NULL,
  	CityId INT,
  	Address VARCHAR(255),
  	StarsNumber INT NOT NULL,
	MainDescription VARCHAR(255),
	NutritionTypeId INT,
   FOREIGN KEY (`CityId`) REFERENCES `Cities`(`ID`),
   FOREIGN KEY (`NutritionTypeId`) REFERENCES `NutritionTypes`(`ID`)
);

CREATE TABLE HotelCharacteristics (
  	ID INT PRIMARY KEY AUTO_INCREMENT,
  	NAME VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE HotelDescriptions (
  	ID INT PRIMARY KEY AUTO_INCREMENT,
  	CharacteristicID INT,
  	HotelID INT,
	FOREIGN KEY (`CharacteristicID`) REFERENCES `HotelCharacteristics`(`ID`),
	FOREIGN KEY (`HotelID`) REFERENCES `Hotels`(`ID`)
);

CREATE TABLE RoomTypes (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(255) NOT NULL,
	Price INT,
	SeatsNumber INT,
	RoomsNumber INT,
	HotelId INT,
  	FOREIGN KEY (`HotelId`) REFERENCES `Hotels`(`ID`)
);

CREATE TABLE RoomTypeCharacteristics (
  	ID INT PRIMARY KEY AUTO_INCREMENT,
  	NAME VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE RoomTypeDescriptions (
  	ID INT PRIMARY KEY AUTO_INCREMENT,
  	CharacteristicID INT,
  	RoomTypeID INT,
	FOREIGN KEY (`CharacteristicID`) REFERENCES `RoomTypeCharacteristics`(`ID`),
	FOREIGN KEY (`RoomTypeID`) REFERENCES `RoomTypes`(`ID`)
);

DESCRIBE Tours;
SELECT * FROM tours;
CREATE TABLE Tours (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	Name VARCHAR(255) UNIQUE NOT NULL,
	MainDescription VARCHAR(255),
	TourTypeId INT,
	HotelId INT,
	FOREIGN KEY (`TourTypeId`) REFERENCES `TourTypes`(`ID`),
	FOREIGN KEY (`HotelId`) REFERENCES `Hotels`(`ID`)
);

CREATE TABLE TourCharacteristics (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE TourDescriptions (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	CharacteristicID INT,
	TourID INT,
	FOREIGN KEY (`CharacteristicID`) REFERENCES `TourCharacteristics`(`ID`),
	FOREIGN KEY (`TourID`) REFERENCES `Tours`(`ID`)
);

CREATE TABLE Reviews (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	UserId INT,
	TourId INT,
	ReviewText VARCHAR(255),
	FOREIGN KEY (`UserId`) REFERENCES `Users`(`ID`),
  	FOREIGN KEY (`TourId`) REFERENCES `Tours`(`ID`)
);

SELECT * FROM DepartmentDepartures;
SELECT * FROM routes;
SELECT * FROM TourDescriptions;
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
	TourId INT,
	FOREIGN KEY (`DepartmentDepartureId`) REFERENCES `DepartmentDepartures`(`ID`),
  	FOREIGN KEY (`TourId`) REFERENCES `Tours`(`ID`)
);

SELECT * FROM Bookings;
DROP TABLE bookings;
CREATE TABLE Bookings (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	OrderSeatsNumber INT,
	UserId INT,
	RouteId INT,
	Price INT,
	Status BOOLEAN DEFAULT 0,
	Comment VARCHAR(255),
	HasСhildren BOOLEAN DEFAULT 0,
	PrioritySeatsInTransport BOOLEAN DEFAULT 0,
	FOREIGN KEY (`UserId`) REFERENCES `Users`(`ID`),
  	FOREIGN KEY (`RouteId`) REFERENCES `Routes`(`ID`)
);

SELECT * FROM BookedRoomTypes;
DROP TABLE BookedRoomTypes;
CREATE TABLE BookedRoomTypes (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	RoomTypeID INT,
	BookingID INT,
	OrderRoomsNumber INT,
  	FOREIGN KEY (`RoomTypeID`) REFERENCES `RoomTypes`(`ID`),
  	FOREIGN KEY (`BookingID`) REFERENCES `Bookings`(`ID`)
);