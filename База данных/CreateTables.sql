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
	  	FOREIGN KEY (`Role`) REFERENCES `Roles`(`ID`)
	);
	
	CREATE TABLE TourTypes (
	  ID INT PRIMARY KEY AUTO_INCREMENT,
	  NAME VARCHAR(255) UNIQUE NOT NULL
	);
	
	CREATE TABLE TourCharacteristics (
	  	ID INT PRIMARY KEY AUTO_INCREMENT,
	  	NAME VARCHAR(255) UNIQUE NOT NULL
	);
	
	CREATE TABLE TourDescriptions (
	  	ID INT PRIMARY KEY AUTO_INCREMENT,
	  	Value BOOLEAN DEFAULT 0 NOT NULL,
	  	CharacteristicID INT,
	  	TourID INT,
		FOREIGN KEY (`CharacteristicID`) REFERENCES `Characteristics`(`ID`),
		FOREIGN KEY (`TourID`) REFERENCES `Tours`(`ID`)
	);
	
	CREATE TABLE Regions (
	  ID INT PRIMARY KEY AUTO_INCREMENT,
	  Name VARCHAR(255) UNIQUE NOT NULL,
	  `PathToImage` VARCHAR(255)
	);
	
	CREATE TABLE Countries (
	  ID INT PRIMARY KEY AUTO_INCREMENT,
	  Name VARCHAR(255) UNIQUE NOT NULL,
	  `PathToFlag` VARCHAR(255),
	  RegionId INT,
	  FOREIGN KEY (`RegionId`) REFERENCES `Regions`(`ID`)
	);
	
	CREATE TABLE Cities (
	  ID INT PRIMARY KEY AUTO_INCREMENT,
	  Name VARCHAR(255) UNIQUE NOT NULL,
	  CountryId INT,
	  FOREIGN KEY (`CountryId`) REFERENCES `Countries`(`ID`)
	);
	
	CREATE TABLE DepartmentDepartures (
	  ID INT PRIMARY KEY AUTO_INCREMENT,
	  Name VARCHAR(255) UNIQUE NOT NULL,
	  CityId INT,
	  FOREIGN KEY (`CityId`) REFERENCES `Cities`(`ID`)
	);
	
	CREATE TABLE TransportTypes (
	  ID INT PRIMARY KEY AUTO_INCREMENT,
	  Name VARCHAR(255) UNIQUE NOT NULL
	);
	
	CREATE TABLE Hotels (
	  ID INT PRIMARY KEY AUTO_INCREMENT,
	  Name VARCHAR(255) UNIQUE NOT NULL,
	  StarsNumber INT UNIQUE NOT NULL,
	  CityId INT,
	  FOREIGN KEY (`CityId`) REFERENCES `Cities`(`ID`)
	);
	
	CREATE TABLE NutritionTypes (
	  ID INT PRIMARY KEY AUTO_INCREMENT,
	  Name VARCHAR(255) UNIQUE NOT NULL
	);
	
	CREATE TABLE Tours (
		ID INT PRIMARY KEY AUTO_INCREMENT,
		Name VARCHAR(255) UNIQUE NOT NULL,
		MainDescription VARCHAR(255),
		TourTypeId INT,
		NutritionTypeId INT,
		HotelId INT,
		Photo BLOB
	);
	
	CREATE TABLE Routes (
		ID INT PRIMARY KEY AUTO_INCREMENT,
		Name VARCHAR(255) UNIQUE NOT NULL,
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