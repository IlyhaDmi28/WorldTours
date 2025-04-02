SET NAMES 'utf8mb4';
SET character_set_client = 'utf8mb4';
SET character_set_connection = 'utf8mb4';
SET character_set_results = 'utf8mb4';
SET character_set_server = 'utf8mb4';

INSERT INTO Roles (`Name`) VALUES ('Пользователь');
INSERT INTO Roles (`Name`) VALUES ('Менеджер');
INSERT INTO Roles (`Name`) VALUES ('Администратор');

INSERT INTO Users (`Email`, `Password`, `Role`, `Name`, `Surname`, `PhoneNumber`) VALUES ('admin@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 3, 'Admin', 'Admin', '+375336461866');

INSERT INTO TourTypes (Name, PathToImage) VALUES ('Отдых на море', '/img/tourTypes/sea.svg');
INSERT INTO TourTypes (Name, PathToImage) VALUES ('Горнолыжный курорт', '/img/tourTypes/ski.svg');
INSERT INTO TourTypes (Name, PathToImage) VALUES ('Путешествия по природе','/img/tourTypes/nature.svg');
INSERT INTO TourTypes (Name, PathToImage) VALUES ('Культурный туризм','/img/tourTypes/culture.svg');
INSERT INTO TourTypes (Name, PathToImage) VALUES ('Обычная поездка','/img/tourTypes/bus.svg');

INSERT INTO TourCharacteristics (NAME) VALUES ('Пляж рядом');
INSERT INTO TourCharacteristics (NAME) VALUES ('За городом');
INSERT INTO TourCharacteristics (NAME) VALUES ('Лес рядом');
INSERT INTO TourCharacteristics (NAME) VALUES ('Горы рядом');
INSERT INTO TourCharacteristics (NAME) VALUES ('Зимняя природа');
INSERT INTO TourCharacteristics (NAME) VALUES ('Исторический центр рядом');

INSERT INTO NutritionTypes (NAME) VALUES ('RO (Room only) — без питания');
INSERT INTO NutritionTypes (NAME) VALUES ('BB (Bed & breakfast) — завтрак');
INSERT INTO NutritionTypes (NAME) VALUES ('HB (Half board) — полупансион');
INSERT INTO NutritionTypes (NAME) VALUES ('FB (Full board) — полный пансион (завтрак, обед и ужин)');
INSERT INTO NutritionTypes (NAME) VALUES ('AI (All inclusive) — всё включено — завтрак, обед и ужин (шведский стол)');

INSERT INTO TransportTypes (NAME) VALUES ('Самолёт');
INSERT INTO TransportTypes (NAME) VALUES ('Автобус');
INSERT INTO TransportTypes (NAME) VALUES ('Корабль');

INSERT INTO Regions (Name, PathToImage) VALUES ('Европа и Россия','/img/regions/europe.jpg');
INSERT INTO Regions (Name, PathToImage) VALUES ('Ближний Восток','/img/regions/middle-east.jpg');
INSERT INTO Regions (Name, PathToImage) VALUES ('Северная Африка','/img/regions/north-africa.jpg');
INSERT INTO Regions (Name, PathToImage) VALUES ('Африка','/img/regions/africa.jpg');
INSERT INTO Regions (Name, PathToImage) VALUES ('Латинская Америка','/img/regions/latin-america.jpg');
INSERT INTO Regions (Name, PathToImage) VALUES ('Северная Америка','/img/regions/north-america.jpg');
INSERT INTO Regions (Name, PathToImage) VALUES ('Юго-Восточная Азия','/img/regions/south-east-asia.jpg');
INSERT INTO Regions (Name, PathToImage) VALUES ('Центральная Азия','/img/regions/central-asia.jpg');
INSERT INTO Regions (Name, PathToImage) VALUES ('Южная Азия','/img/regions/south-asia.jpg');
INSERT INTO Regions (Name, PathToImage) VALUES ('Восточная Азия','/img/regions/east-asia.jpg');
INSERT INTO Regions (Name, PathToImage) VALUES ('Океания','/img/regions/oceania.jpg');

INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Аргентина','/img/flags/argentina.svg', 5);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Австралия','/img/flags/australia.svg', 11);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Беларусь','/img/flags/belarus.svg', 1);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Бразилия','/img/flags/brazil.svg', 5);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Болгария','/img/flags/bulgaria.svg', 1);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Канада','/img/flags/canada.svg', 6);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Дем. Респ. Конго','/img/flags/democratic_republic_of_the_congo.svg', 4);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Египет','/img/flags/egypt.svg', 3);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Франция','/img/flags/france.svg', 1);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Италия','/img/flags/italy.svg', 1);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Индия','/img/flags/india.svg', 9);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Индонезия','/img/flags/indonesia.svg', 7);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Израиль','/img/flags/israel.svg', 2);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Япония','/img/flags/japan.svg', 10);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Иордания','/img/flags/jordan.svg', 2);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Казахстан','/img/flags/kazakhstan.svg', 8);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Кения','/img/flags/kenya.svg', 4);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Кыргизстан','/img/flags/kyrgyzstan.svg', 8);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Мексика','/img/flags/mexico.svg', 5);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Новая Зеландия','/img/flags/new_zealand.svg', 11);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Норвегия','/img/flags/norway.svg', 1);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Южная Корея','/img/flags/south_korea.svg', 10);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Швейцария','/img/flags/switzerland.svg', 1);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Тайланд','/img/flags/thailand.svg', 7);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Тунис','/img/flags/tunisia.svg', 3);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Турция','/img/flags/turkey.svg', 2);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('ОАЭ','/img/flags/uae.svg', 2);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('США','/img/flags/usa.svg', 6);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Узбекистан','/img/flags/uzbekistan.svg', 8);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Вьетнам','/img/flags/vietnam.svg', 7);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Китай','/img/flags/сhina.svg', 10);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Куба','/img/flags/сuba.svg',  5);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Россия','/img/flags/russia.svg',  1);
INSERT INTO Countries (NAME, PathToFlag, RegionId) VALUES ('Польша','/img/flags/poland.svg',  1);

INSERT INTO Cities (NAME, CountryId) VALUES ('Минск', 3);
INSERT INTO Cities (NAME, CountryId) VALUES ('Брест', 3);
INSERT INTO Cities (NAME, CountryId) VALUES ('Витебск', 3);
INSERT INTO Cities (NAME, CountryId) VALUES ('Гродно', 3);

INSERT INTO Cities (NAME, CountryId) VALUES ('Буэнос-Айрес', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Кордова', 1);
INSERT INTO Cities (NAME, CountryId) VALUES ('Мендоса', 1);

INSERT INTO Cities (NAME, CountryId) VALUES ('Сидней', 2);
INSERT INTO Cities (NAME, CountryId) VALUES ('Мельбурн', 2);
INSERT INTO Cities (NAME, CountryId) VALUES ('Перт', 2);
INSERT INTO Cities (NAME, CountryId) VALUES ('Дарвин', 2);

INSERT INTO Cities (NAME, CountryId) VALUES ('Рио-де-Жанейро', 4);
INSERT INTO Cities (NAME, CountryId) VALUES ('Сан-Паулу', 4);
INSERT INTO Cities (NAME, CountryId) VALUES ('Бразилиа', 4);

INSERT INTO Cities (NAME, CountryId) VALUES ('София', 5);
INSERT INTO Cities (NAME, CountryId) VALUES ('Варна', 5);
INSERT INTO Cities (NAME, CountryId) VALUES ('Пловдив', 5);

INSERT INTO Cities (NAME, CountryId) VALUES ('Торонто', 6);
INSERT INTO Cities (NAME, CountryId) VALUES ('Ванкувер', 6);
INSERT INTO Cities (NAME, CountryId) VALUES ('Монреаль', 6);

INSERT INTO Cities (NAME, CountryId) VALUES ('Киншаса', 7);
INSERT INTO Cities (NAME, CountryId) VALUES ('Лубумбаши', 7);

INSERT INTO Cities (NAME, CountryId) VALUES ('Каир', 8);
INSERT INTO Cities (NAME, CountryId) VALUES ('Шарм-эш-Шейх', 8);
INSERT INTO Cities (NAME, CountryId) VALUES ('Александрия', 8);

INSERT INTO Cities (NAME, CountryId) VALUES ('Париж', 9);
INSERT INTO Cities (NAME, CountryId) VALUES ('Марсель', 9);
INSERT INTO Cities (NAME, CountryId) VALUES ('Лион', 9);

INSERT INTO Cities (NAME, CountryId) VALUES ('Рим', 10);
INSERT INTO Cities (NAME, CountryId) VALUES ('Венеция', 10);
INSERT INTO Cities (NAME, CountryId) VALUES ('Милан', 10);
INSERT INTO Cities (NAME, CountryId) VALUES ('Неаполь', 10);

INSERT INTO Cities (NAME, CountryId) VALUES ('Нью-Дели', 11);
INSERT INTO Cities (NAME, CountryId) VALUES ('Мумбаи', 11);
INSERT INTO Cities (NAME, CountryId) VALUES ('Ченнаи', 11);

INSERT INTO Cities (NAME, CountryId) VALUES ('Джакарта', 12);
INSERT INTO Cities (NAME, CountryId) VALUES ('Сурабая', 12);
INSERT INTO Cities (NAME, CountryId) VALUES ('Денпасар', 12);

INSERT INTO Cities (NAME, CountryId) VALUES ('Иерусалим', 13);
INSERT INTO Cities (NAME, CountryId) VALUES ('Тель-Авив', 13);
INSERT INTO Cities (NAME, CountryId) VALUES ('Хайфа', 13);

INSERT INTO Cities (NAME, CountryId) VALUES ('Токио', 14);
INSERT INTO Cities (NAME, CountryId) VALUES ('Киото', 14);
INSERT INTO Cities (NAME, CountryId) VALUES ('Осака', 14);

INSERT INTO Cities (NAME, CountryId) VALUES ('Амман', 15);
INSERT INTO Cities (NAME, CountryId) VALUES ('Петра', 15);

INSERT INTO Cities (NAME, CountryId) VALUES ('Астана', 16);
INSERT INTO Cities (NAME, CountryId) VALUES ('Алматы', 16);

INSERT INTO Cities (NAME, CountryId) VALUES ('Найроби', 17);
INSERT INTO Cities (NAME, CountryId) VALUES ('Момбаса', 17);

INSERT INTO Cities (NAME, CountryId) VALUES ('Бишкек', 18);
INSERT INTO Cities (NAME, CountryId) VALUES ('Каракол', 18);

INSERT INTO Cities (NAME, CountryId) VALUES ('Мехико', 19);
INSERT INTO Cities (NAME, CountryId) VALUES ('Канкун', 19);
INSERT INTO Cities (NAME, CountryId) VALUES ('Гвадалахара', 19);

INSERT INTO Cities (NAME, CountryId) VALUES ('Окленд', 20);
INSERT INTO Cities (NAME, CountryId) VALUES ('Веллингтон', 20);
INSERT INTO Cities (NAME, CountryId) VALUES ('Куинстаун', 20);

INSERT INTO Cities (NAME, CountryId) VALUES ('Осло', 21);
INSERT INTO Cities (NAME, CountryId) VALUES ('Берген', 21);
INSERT INTO Cities (NAME, CountryId) VALUES ('Тронхейм', 21);

INSERT INTO Cities (NAME, CountryId) VALUES ('Сеул', 22);
INSERT INTO Cities (NAME, CountryId) VALUES ('Пусан', 22);

INSERT INTO Cities (NAME, CountryId) VALUES ('Цюрих', 23);
INSERT INTO Cities (NAME, CountryId) VALUES ('Женева', 23);

INSERT INTO Cities (NAME, CountryId) VALUES ('Бангкок', 24);
INSERT INTO Cities (NAME, CountryId) VALUES ('Пхукет', 24);
INSERT INTO Cities (NAME, CountryId) VALUES ('Чиангмай', 24);

INSERT INTO Cities (NAME, CountryId) VALUES ('Тунис', 25);
INSERT INTO Cities (NAME, CountryId) VALUES ('Сус', 25);

INSERT INTO Cities (NAME, CountryId) VALUES ('Стамбул', 26);
INSERT INTO Cities (NAME, CountryId) VALUES ('Анкара', 26);
INSERT INTO Cities (NAME, CountryId) VALUES ('Анталья', 26);

INSERT INTO Cities (NAME, CountryId) VALUES ('Дубай', 27);
INSERT INTO Cities (NAME, CountryId) VALUES ('Абу-Даби', 27);

INSERT INTO Cities (NAME, CountryId) VALUES ('Нью-Йорк', 28);
INSERT INTO Cities (NAME, CountryId) VALUES ('Лос-Анджелес', 28);
INSERT INTO Cities (NAME, CountryId) VALUES ('Майами', 28);

INSERT INTO Cities (NAME, CountryId) VALUES ('Ташкент', 29);
INSERT INTO Cities (NAME, CountryId) VALUES ('Самарканд', 29);

INSERT INTO Cities (NAME, CountryId) VALUES ('Ханой', 30);
INSERT INTO Cities (NAME, CountryId) VALUES ('Хошимин', 30);

INSERT INTO Cities (NAME, CountryId) VALUES ('Пекин', 31);
INSERT INTO Cities (NAME, CountryId) VALUES ('Шанхай', 31);
INSERT INTO Cities (NAME, CountryId) VALUES ('Гуанчжоу', 31);

INSERT INTO Cities (NAME, CountryId) VALUES ('Гавана', 32);
INSERT INTO Cities (NAME, CountryId) VALUES ('Варадеро', 32);

INSERT INTO Cities (NAME, CountryId) VALUES ('Москва', 33);

INSERT INTO Cities (NAME, CountryId) VALUES ('Варшава', 34);

INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Автовокзал «Центральный»', 1, 'Минск, Минская область', 2, 53.890370, 27.554445);
INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Национальный аэропорт «Минск»', 1, 'Минск, Минская область', 1, 53.889426, 28.033325);

INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Автовокзал г. Брест', 2, 'ул. Орджоникидзе 12, Брест, Брестская область', 2, 52.098857, 23.681265);
INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Автовокзал г. Гродно', 4, 'ул. Красноармейская, Гродно, Гродненская область', 2, 53.677419, 23.843227);

INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Аэропорт «Шереметьево»', 88, 'Химки, Московская обл., Россия, 141400', 1, 55.977307, 37.403271);
INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Аэропорт «Внуково»', 88, 'Москва, Россия', 1, 55.599156, 37.268516);
INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Аэропорт «Домодедово»', 88, 'Московская обл., Россия', 1, 55.411721, 37.900495);
INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Аэропорт «Жуковский»', 88, 'ул. Наркомвод, 3, Жуковский, Московская обл., Россия, 140185', 1, 55.561802, 38.117672);

INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Варшавский аэропорт имени Фридерика Шопена', 89, 'Żwirki i Wigury 1, 02-143 Warszawa, Польша', 1, 52.173467, 20.970140);

INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Порт Майами', 84, 'Shengsi County, Чжоушань, Китай, 202461', 3, 30.608046, 122.086732);


INSERT INTO HotelCharacteristics (NAME) VALUES ('Бассейн');
INSERT INTO HotelCharacteristics (NAME) VALUES ('Джакузи');
INSERT INTO HotelCharacteristics (NAME) VALUES ('Дискотеки');
INSERT INTO HotelCharacteristics (NAME) VALUES ('Бильярд');
INSERT INTO HotelCharacteristics (NAME) VALUES ('Тенис');
INSERT INTO HotelCharacteristics (NAME) VALUES ('Парковка рядом');
INSERT INTO HotelCharacteristics (NAME) VALUES ('Магазины');
INSERT INTO HotelCharacteristics (NAME) VALUES ('Бар');
INSERT INTO HotelCharacteristics (NAME) VALUES ('Различные развлечения');


INSERT INTO RoomTypeCharacteristics (NAME) VALUES ('Наличие Wi-fi');
INSERT INTO RoomTypeCharacteristics (NAME) VALUES ('Телевизор');
INSERT INTO RoomTypeCharacteristics (NAME) VALUES ('Холодильник');
INSERT INTO RoomTypeCharacteristics (NAME) VALUES ('Балкон');
INSERT INTO RoomTypeCharacteristics (NAME) VALUES ('Вид на море');
INSERT INTO RoomTypeCharacteristics (NAME) VALUES ('Вид на горы');
INSERT INTO RoomTypeCharacteristics (NAME) VALUES ('Мини холодильник');
INSERT INTO RoomTypeCharacteristics (NAME) VALUES ('Раздельный санузел');

SELECT * FROM Cities;
INSERT INTO `Hotels` (`Name`, `CityId`, `Address`, `StarsNumber`, `MainDescription`, `NutritionTypeId`, `Lat`, `Lng`)
VALUES
('Hotel Grand', 26, '123 Champs Elysees', 5, 'Luxury hotel in the city center', 1, 48.8566, 2.3522),
('Sunset Resort', 67, '456 Ocean Drive', 4, 'Beautiful beachside resort', 2, 25.7617, -80.1918),
('Mountain Lodge', 61, '789 Rocky Road', 3, 'Cozy lodge in the mountains', 3, 63.421231, 10.540638);

-- Вставка данных в таблицу HotelDescriptions
INSERT INTO `HotelDescriptions` (`CharacteristicID`, `HotelID`)
VALUES
(1, 1), (3, 1), (5, 1), (7, 1),
(2, 2), (4, 2), (6, 2), (8, 2),
(3, 3), (5, 3), (7, 3), (9, 3);

-- Вставка данных в таблицу RoomTypes
INSERT INTO `RoomTypes` (`NAME`, `Price`, `SeatsNumber`, `RoomsNumber`, `HotelId`)
VALUES
('Luxury Suite', 500, 2, 10, 1),
('Deluxe Room', 300, 2, 20, 1),
('Apartment', 400, 4, 5, 2),
('Standard Room', 150, 2, 30, 2),
('Family Room', 250, 4, 15, 3);

-- Вставка данных в таблицу RoomTypeDescriptions
INSERT INTO `RoomTypeDescriptions` (`CharacteristicID`, `RoomTypeID`)
VALUES
(1, 1), (3, 1), (5, 1), (7, 1),
(2, 2), (4, 2), (6, 2), (8, 2),
(3, 3), (5, 3), (7, 3),
(1, 4), (2, 4), (4, 4), (6, 4),
(2, 5), (3, 5), (5, 5), (8, 5);
