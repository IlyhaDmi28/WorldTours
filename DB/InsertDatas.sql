INSERT INTO Roles (`Name`) VALUES ('Пользователь');
INSERT INTO Roles (`Name`) VALUES ('Менеджер');
INSERT INTO Roles (`Name`) VALUES ('Администратор');

INSERT INTO Users (`Email`, `Password`, `Role`, `Name`, `Surname`, `PhoneNumber`, `Photo`) VALUES ('admin@gmail.com', '1234', 3, 'Admin', 'Admin', '+375336461866', LOAD_FILE('D:/Univer/Курсач/Аватарки/i.png'));

INSERT INTO TourTypes (Name, Image) VALUES ('Отдых на море', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/TourTypes/sea.svg'));
INSERT INTO TourTypes (Name, Image) VALUES ('Горнолыжный курорт', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/TourTypes/ski.svg'));
INSERT INTO TourTypes (Name, Image) VALUES ('Путешествия по природе', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/TourTypes/nature.svg'));
INSERT INTO TourTypes (Name, Image) VALUES ('Культурный туризм', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/TourTypes/culture.svg'));
INSERT INTO TourTypes (Name, Image) VALUES ('Обычная поездка', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/TourTypes/bus.svg'));

INSERT INTO CharacteristicTypes (Name) VALUES ('Расположение');
INSERT INTO CharacteristicTypes (Name) VALUES ('В номере');
INSERT INTO CharacteristicTypes (Name) VALUES ('В отеле');

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


INSERT INTO NutritionTypes (NAME) VALUES ('RO (Room only) — без питания');
INSERT INTO NutritionTypes (NAME) VALUES ('BB (Bed & breakfast) — завтрак');
INSERT INTO NutritionTypes (NAME) VALUES ('HB (Half board) — полупансион');
INSERT INTO NutritionTypes (NAME) VALUES ('FB (Full board) — полный пансион (завтрак, обед и ужин)');
INSERT INTO NutritionTypes (NAME) VALUES ('AI (All inclusive) — всё включено — завтрак, обед и ужин (шведский стол)');

INSERT INTO TransportTypes (NAME) VALUES ('Самолёт');
INSERT INTO TransportTypes (NAME) VALUES ('Автобус');
INSERT INTO TransportTypes (NAME) VALUES ('Корабль');

INSERT INTO Regions (Name, Image) VALUES ('Европа и Россия', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/regions/europe.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Ближний Восток', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/regions/middle-east.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Северная Африка', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/regions/north-africa.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Африка', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/regions/africa.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Латинская Америка', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/regions/latin-america.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Северная Америка', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/regions/north-america.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Юго-Восточная Азия', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/regions/south-east-asia.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Центральная Азия', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/regions/central-asia.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Южная Азия', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/regions/south-asia.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Восточная Азия', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/regions/east-asia.jpg'));
INSERT INTO Regions (Name, Image) VALUES ('Океания', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/regions/oceania.jpg'));

INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Аргентина', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/argentina.svg'), 5);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Австралия', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/australia.svg'), 11);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Беларусь', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/belarus.svg'), 1);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Бразилия', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/brazil.svg'), 5);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Болгария', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/bulgaria.svg'), 1);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Канада', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/canada.svg'), 6);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Дем. Респ. Конго', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/democratic_republic_of_the_congo.svg'), 4);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Египет', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/egypt.svg'), 3);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Франция', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/france.svg'), 1);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Италия', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/italy.svg'), 1);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Индия', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/india.svg'), 9);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Индонезия', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/indonesia.svg'), 7);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Израиль', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/israel.svg'), 2);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Япония', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/japan.svg'), 10);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Иордания', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/jordan.svg'), 2);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Казахстан', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/kazakhstan.svg'), 8);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Кения', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/kenya.svg'), 4);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Киргизстан', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/kyrgyzstan.svg'), 8);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Мексика', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/mexico.svg'), 5);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Новая Зеландия', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/new_zealand.svg'), 11);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Норвегия', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/norway.svg'), 1);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Южная Корея', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/south_korea.svg'), 10);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Швейцария', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/switzerland.svg'), 1);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Таиланд', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/thailand.svg'), 7);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Тунис', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/tunisia.svg'), 3);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Турция', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/turkey.svg'), 2);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('ОАЭ', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/uae.svg'), 2);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('США', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/usa.svg'), 6);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Узбекистан', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/uzbekistan.svg'), 8);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Вьетнам', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/vietnam.svg'), 7);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Китай', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/сhina.svg'), 10);
INSERT INTO Countries (NAME, Flag, RegionId) VALUES ('Куба', LOAD_FILE('D:/Univer/Курсач/WorldTours/backend/wwwroot/img/flags/сuba.svg'),  5);
SELECT * FROM countries;

INSERT INTO Cities (NAME, CountryId) VALUES ('Минск', 3);
INSERT INTO Cities (NAME, CountryId) VALUES ('Брест', 3);
INSERT INTO Cities (NAME, CountryId) VALUES ('Витебск', 3);
INSERT INTO Cities (NAME, CountryId) VALUES ('Гродно', 3);

INSERT INTO Cities (NAME, CountryId) VALUES ('София', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Варна', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Бургас', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Пловдив', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Дубай', 3);
INSERT INTO Cities (NAME, CountryId) VALUES ('Пхукет', 4);
INSERT INTO Cities (NAME, CountryId) VALUES ('Тронхейм', 5);

INSERT INTO Cities (NAME, CountryId) VALUES ('Минск', 2);
INSERT INTO Cities (NAME, CountryId) VALUES ('София', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Варна', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Бургас', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Пловдив', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Дубай', 3);
INSERT INTO Cities (NAME, CountryId) VALUES ('Пхукет', 4);
INSERT INTO Cities (NAME, CountryId) VALUES ('Тронхейм', 5);
SELECT * FROM cities;

INSERT INTO DepartmentDepartures (NAME, CityId) VALUES ('Автовокзал «Центральный»', 1);
INSERT INTO DepartmentDepartures (NAME, CityId) VALUES ('Национальный аэропорт «Минск»', 1);

INSERT INTO TransportTypes (NAME) VALUES ('Самолёт');
INSERT INTO TransportTypes (NAME) VALUES ('Автобус');
INSERT INTO TransportTypes (NAME) VALUES ('Корабль');

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Чёрный дельфин', 5, 3);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Отель Андрея-гея', 2, 5);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Золотой парус', 5, 6);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Зелёный бриз', 4, 7);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Старая волна', 3, 7);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Северный мир', 4, 8);
