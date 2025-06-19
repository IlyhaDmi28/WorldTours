
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
INSERT INTO TourCharacteristics (NAME) VALUES ('Пустынная местность');
INSERT INTO TourCharacteristics (NAME) VALUES ('Степная местность');
INSERT INTO TourCharacteristics (NAME) VALUES ('Холмистая местность');
INSERT INTO TourCharacteristics (NAME) VALUES ('Озеро рядом');
INSERT INTO TourCharacteristics (NAME) VALUES ('Море рядом');
INSERT INTO TourCharacteristics (NAME) VALUES ('Река рядом');
INSERT INTO TourCharacteristics (NAME) VALUES ('Современный город');

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

INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Аргентина','/img/flags/argentina.svg', 5, -34.61, -58.38);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Австралия','/img/flags/australia.svg', 11, -35.28, 149.13);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Беларусь','/img/flags/belarus.svg', 1, 53.90, 27.57);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Бразилия','/img/flags/brazil.svg', 5, -15.78, -47.93);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Болгария','/img/flags/bulgaria.svg', 1, 42.70, 23.32);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Канада','/img/flags/canada.svg', 6, 45.42, -75.69);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Дем. Респ. Конго','/img/flags/democratic_republic_of_the_congo.svg', 4, -4.32, 15.31);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Египет','/img/flags/egypt.svg', 3, 30.05, 31.25);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Франция','/img/flags/france.svg', 1, 48.85, 2.35);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Италия','/img/flags/italy.svg', 1, 41.90, 12.50);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Индия','/img/flags/india.svg', 9, 28.61, 77.21);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Индонезия','/img/flags/indonesia.svg', 7, -6.21, 106.85);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Израиль','/img/flags/israel.svg', 2, 31.77, 35.21);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Япония','/img/flags/japan.svg', 10, 35.68, 139.76);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Иордания','/img/flags/jordan.svg', 2, 31.95, 35.93);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Казахстан','/img/flags/kazakhstan.svg', 8, 51.16, 71.43);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Кения','/img/flags/kenya.svg', 4, -1.29, 36.82);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Кыргизстан','/img/flags/kyrgyzstan.svg', 8, 42.87, 74.59);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Мексика','/img/flags/mexico.svg', 5, 19.43, -99.13);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Новая Зеландия','/img/flags/new_zealand.svg', 11, -41.29, 174.78);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Норвегия','/img/flags/norway.svg', 1, 59.91, 10.75);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Южная Корея','/img/flags/south_korea.svg', 10, 37.57, 126.98);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Швейцария','/img/flags/switzerland.svg', 1, 46.95, 7.44);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Тайланд','/img/flags/thailand.svg', 7, 13.75, 100.50);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Тунис','/img/flags/tunisia.svg', 3, 36.80, 10.18);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Турция','/img/flags/turkey.svg', 2, 39.93, 32.86);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('ОАЭ','/img/flags/uae.svg', 2, 24.47, 54.37);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('США','/img/flags/usa.svg', 6, 38.90, -77.04);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Узбекистан','/img/flags/uzbekistan.svg', 8, 41.31, 69.28);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Вьетнам','/img/flags/vietnam.svg', 7, 21.03, 105.85);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Китай','/img/flags/сhina.svg', 10, 39.91, 116.40);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Куба','/img/flags/сuba.svg', 5, 23.13, -82.38);
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Россия','/img/flags/russia.svg', 1, 55.75, 37.62); 
INSERT INTO Countries (NAME, PathToFlag, RegionId, Lat, Lng) VALUES ('Польша','/img/flags/poland.svg', 1, 52.23, 21.01); 


INSERT INTO Climates (NAME) VALUES ('Экваториальный'); 
INSERT INTO Climates (NAME) VALUES ('Субэкваториальный'); 
INSERT INTO Climates (NAME) VALUES ('Тропический'); 
INSERT INTO Climates (NAME) VALUES ('Субтропический'); 
INSERT INTO Climates (NAME) VALUES ('Умеренный'); 
INSERT INTO Climates (NAME) VALUES ('Субарктический'); 
INSERT INTO Climates (NAME) VALUES ('Горный'); 

-- Беларусь (Умеренный)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Минск', 3, 5, 53.9006, 27.5590);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Брест', 3, 5, 52.0976, 23.7341);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Витебск', 3, 5, 55.1904, 30.2049);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Гродно', 3, 5, 53.6694, 23.8131);

-- Аргентина (Буэнос-Айрес — умеренный, Кордова и Мендоса — субтропический)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Буэнос-Айрес', 1, 5, -34.6037, -58.3816);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Кордова', 1, 4, -31.4201, -64.1888);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Мендоса', 1, 4, -32.8895, -68.8458);

-- Австралия
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Сидней', 2, 4, -33.8688, 151.2093);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Мельбурн', 2, 4, -37.8136, 144.9631);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Перт', 2, 3, -31.9505, 115.8605);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Дарвин', 2, 2, -12.4634, 130.8456);

-- Бразилия
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Рио-де-Жанейро', 4, 2, -22.9068, -43.1729);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Сан-Паулу', 4, 2, -23.5505, -46.6333);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Бразилиа', 4, 2, -15.7939, -47.8828);

-- Болгария (Умеренный/Субтропический)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('София', 5, 5, 42.6977, 23.3219);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Варна', 5, 4, 43.2141, 27.9147);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Пловдив', 5, 4, 42.1354, 24.7453);

-- Канада
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Торонто', 6, 5, 43.6511, -79.3839);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Ванкувер', 6, 5, 49.2827, -123.1207);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Монреаль', 6, 5, 45.5017, -73.5673);

-- ДР Конго
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Киншаса', 7, 1, -4.4419, 15.2663);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Лубумбаши', 7, 2, -11.6870, 27.5026);

-- Египет (Тропический пустынный)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Каир', 8, 3, 30.0444, 31.2357);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Шарм-эш-Шейх', 8, 3, 27.9158, 34.3299);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Александрия', 8, 3, 31.2001, 29.9187);

-- Франция
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Париж', 9, 5, 48.8566, 2.3522);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Марсель', 9, 4, 43.2965, 5.3698);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Лион', 9, 5, 45.7640, 4.8357);

-- Италия (Субтропический — 4)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Рим', 10, 4, 41.9028, 12.4964);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Венеция', 10, 4, 45.4408, 12.3155);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Милан', 10, 4, 45.4642, 9.1900);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Неаполь', 10, 4, 40.8518, 14.2681);

-- Индия
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Нью-Дели', 11, 2, 28.6139, 77.2090);  -- Субэкваториальный
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Мумбаи', 11, 3, 19.0760, 72.8777);    -- Тропический
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Ченнаи', 11, 3, 13.0827, 80.2707);    -- Тропический

-- Индонезия (Экваториальный — 1)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Джакарта', 12, 1, -6.2088, 106.8456);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Сурабая', 12, 1, -7.2575, 112.7521);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Денпасар', 12, 1, -8.6705, 115.2126);

-- Израиль (Субтропический — 4)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Иерусалим', 13, 4, 31.7683, 35.2137);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Тель-Авив', 13, 4, 32.0853, 34.7818);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Хайфа', 13, 4, 32.7940, 34.9896);

-- Япония (Умеренный — 5)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Токио', 14, 5, 35.6895, 139.6917);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Киото', 14, 5, 35.0116, 135.7681);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Осака', 14, 5, 34.6937, 135.5023);

-- Иордания (Субтропический — 4)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Амман', 15, 4, 31.9539, 35.9106);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Петра', 15, 4, 30.3285, 35.4444);

-- Казахстан
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Астана', 16, 6, 51.1605, 71.4704); -- Субарктический
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Алматы', 16, 5, 43.2220, 76.8512); -- Умеренный

-- Кения
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Найроби', 17, 2, -1.2921, 36.8219);  -- Субэкваториальный
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Момбаса', 17, 1, -4.0435, 39.6682);  -- Экваториальный

-- Кыргызстан (Умеренный — 5)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Бишкек', 18, 5, 42.8746, 74.5698);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Каракол', 18, 5, 42.4923, 78.3936);

-- Мексика
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Мехико', 19, 5, 19.4326, -99.1332);  -- Умеренный (высокогорье)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Канкун', 19, 3, 21.1619, -86.8515);  -- Тропический
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Гвадалахара', 19, 4, 20.6597, -103.3496);  -- Субтропический

-- Новая Зеландия (Умеренный — 5)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Окленд', 20, 5, -36.8485, 174.7633);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Веллингтон', 20, 5, -41.2865, 174.7762);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Куинстаун', 20, 5, -45.0312, 168.6626);

-- Норвегия (Субарктический — 6)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Осло', 21, 6, 59.9139, 10.7522);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Берген', 21, 6, 60.3913, 5.3221);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Тронхейм', 21, 6, 63.4305, 10.3951);

-- Южная Корея (Умеренный — 5)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Сеул', 22, 5, 37.5665, 126.9780);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Пусан', 22, 5, 35.1796, 129.0756);

-- Швейцария (Умеренный — 5)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Цюрих', 23, 5, 47.3769, 8.5417);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Женева', 23, 5, 46.2044, 6.1432);

-- Таиланд
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Бангкок', 24, 2, 13.7563, 100.5018);  -- Субэкваториальный
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Пхукет', 24, 3, 7.8804, 98.3923);     -- Тропический
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Чиангмай', 24, 3, 18.7883, 98.9853);  -- Тропический

-- Тунис (Субтропический — 4)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Тунис', 25, 4, 36.8065, 10.1815);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Сус', 25, 4, 35.8256, 10.6084);

-- Турция
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Стамбул', 26, 4, 41.0082, 28.9784); -- Субтропический
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Анкара', 26, 5, 39.9334, 32.8597); -- Умеренный
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Анталья', 26, 4, 36.8969, 30.7133); -- Субтропический

-- ОАЭ (Тропический — 3, пустынный тип)
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Дубай', 27, 3, 25.2048, 55.2708);
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Абу-Даби', 27, 3, 24.4539, 54.3773);

-- США
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Нью-Йорк', 28, 5, 40.7128, -74.0060); -- Умеренный
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Лос-Анджелес', 28, 4, 34.0522, -118.2437); -- Субтропический
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Майами', 28, 4, 25.7617, -80.1918); -- Субтропический

-- Узбекистан
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Ташкент', 29, 5, 41.2995, 69.2401); -- Умеренный
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Самарканд', 29, 5, 39.6542, 66.9597); -- Умеренный

-- Вьетнам
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Ханой', 30, 2, 21.0285, 105.8544); -- Субэкваториальный
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Хошимин', 30, 3, 10.8231, 106.6297); -- Тропический

-- Китай
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Пекин', 31, 5, 39.9042, 116.4074); -- Умеренный
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Шанхай', 31, 5, 31.2304, 121.4737); -- Умеренный
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Гуанчжоу', 31, 3, 23.1291, 113.2644); -- Тропический

-- Куба
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Гавана', 32, 3, 23.1136, -82.3666); -- Тропический
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Варадеро', 32, 3, 23.1553, -81.2432); -- Тропический

-- Россия
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Москва', 33, 5, 55.7558, 37.6173); -- Умеренный

-- Польша
INSERT INTO Cities (NAME, CountryId, ClimateId, Lat, Lng) VALUES ('Варшава', 34, 5, 52.2297, 21.0122); -- Умеренный



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
