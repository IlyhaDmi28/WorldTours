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
INSERT INTO TourCharacteristics (NAME) VALUES ('Наличие Wi-fi');
INSERT INTO TourCharacteristics (NAME) VALUES ('Раздельные кровати');
INSERT INTO TourCharacteristics (NAME) VALUES ('Раздельный санузел');
INSERT INTO TourCharacteristics (NAME) VALUES ('Бассейн');
INSERT INTO TourCharacteristics (NAME) VALUES ('Джакузи');
INSERT INTO TourCharacteristics (NAME) VALUES ('Дискотеки');
INSERT INTO TourCharacteristics (NAME) VALUES ('Бильярд');
INSERT INTO TourCharacteristics (NAME) VALUES ('Тенис');
INSERT INTO TourCharacteristics (NAME) VALUES ('Различные развлечения');

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

INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Автовокзал «Центральный»', 1, 'xxxx', 2, 53, 27);
INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Национальный аэропорт «Минск»', 1, 'aaaa', 1, 53, 27);

INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Автовокзал г. Брест', 2, 'zzzz', 2, 53, 27);
INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Автовокзал г. Гродно', 4, 'xxxxxx', 2, 53, 27);

INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Аэропорт «Шереметьево»', 88, 'vvvv', 1, 53, 27);
INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Аэропорт «Внуково »', 88, 'ffff', 1, 53, 27);
INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Аэропорт «Домодедово »', 88, 'aaassd', 1, 53, 27);
INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Аэропорт «Жуковский»', 88, 'ffgfdssd', 1, 53, 27);

INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Варшавский аэропорт имени Фридерика Шопена', 89, 'fsdfsdsfd', 1, 53, 27);

INSERT INTO DepartmentDepartures (NAME, CityId, Address, TransportTypeId, Lat, Lng) VALUES ('Порт Майами', 78, 'fsdfsdfs', 3, 53, 27);


INSERT INTO HotelCharacteristics (NAME) VALUES ('Бассейн');
INSERT INTO HotelCharacteristics (NAME) VALUES ('Джакузи');
INSERT INTO HotelCharacteristics (NAME) VALUES ('Дискотеки');
INSERT INTO HotelCharacteristics (NAME) VALUES ('Бильярд');
INSERT INTO HotelCharacteristics (NAME) VALUES ('Тенис');
INSERT INTO HotelCharacteristics (NAME) VALUES ('Различные развлечения');


INSERT INTO RoomTypeCharacteristics (NAME) VALUES ('Наличие Wi-fi');
INSERT INTO RoomTypeCharacteristics (NAME) VALUES ('Раздельные кровати');
INSERT INTO RoomTypeCharacteristics (NAME) VALUES ('Раздельный санузел');


INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Hotel Tango', 4, 5);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Plaza del Sol', 3, 5);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Palermo Grand', 5, 5);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Sierra Vista Hotel', 3, 6);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Pampas Lodge', 4, 6);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Andes Grand Hotel', 4, 7);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Vineyard Retreat', 4, 7);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Opera Harbour Hotel', 5, 8);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Darling Bay Resort', 4, 8);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Yarra View Hotel', 4, 9);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('City Garden Inn', 4, 9);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Crown Tower Hotel', 5, 9);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Sunshine Stay', 4, 10);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Riverfront Palace', 4, 10);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('The Cavenagh Hotel', 4, 11);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Hilton Darwin', 5, 11);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Copacabana Palace', 5, 12);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Sugarloaf View Hotel', 4, 12);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Paulista Garden', 4, 13);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Skyline Inn', 3, 13);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Bahian Dreams Hotel', 4, 14);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Balkan Jewel Hotel', 4, 15);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Sofia City Inn', 3, 15);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Golden Sands Resort', 5, 16);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Black Sea Breeze', 4, 16);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Old Town Inn', 3, 17);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Maple Leaf Hotel', 4, 18);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('CN Tower Suites', 5, 18);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Pacific Breeze Hotel', 5, 19);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Waterfront Lodge', 5, 19);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Fleur de Lys Inn', 4, 20);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Mount Royal Retreat', 4, 20);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Congo River Hotel', 2, 21);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('African Heart Inn', 3, 21);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Katanga Grand', 1, 22);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Nile View Hotel', 4, 23);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Pyramid Horizon Inn', 3, 23);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Coral Reef Resort', 4, 24);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Red Sea Paradise', 5, 24);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Nubian Oasis Hotel', 3, 25);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Champs Élysées Grand', 5, 26);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Montmartre Charm Hotel', 4, 26);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Eiffel Elegance Inn', 5, 26);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Côte d\'Azur Hotel', 5, 27);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Old Port Suites', 4, 27);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Rhône Boutique Hotel', 5, 28);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Silk Road Inn', 4, 28);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Eternal City Hotel', 5, 29);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Colosseum Inn', 4, 29);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Grand Canal Palace', 5, 30);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Lagoon View Hotel', 4, 30);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Renaissance Villa Hotel', 4, 31);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Arno River Retreat', 4, 31);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Holiday Inn Naples, an IHG Hotel', 4, 32);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Hotel Palazzo Argenta', 4, 32);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Lotus Palace Hotel', 3, 33);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Red Fort Inn', 3, 33);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Arabian Sea View Hotel', 2, 34);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Gateway Suites', 3, 34);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Marina Beach Inn', 3, 35);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Four Seasons Jakarta', 4, 36);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Hilton Garden Inn Jakarta Taman Palem', 5, 36);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('JW Marriott Hotel Surabaya', 3, 37);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Grand Inna Tunjungan', 5, 37);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Hyatt Regency Bali', 5, 35);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Ganga Hotel & Apartment,Denpasar-Bali', 4, 38);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Holy City Inn', 4, 39);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('David''s Citadel Hotel', 5, 39);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Mediterranean Breeze Hotel', 5, 40);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Sea Tower Inn', 5, 40);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Mount Carmel View', 4, 41);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Sakura Tower Hotel', 5, 42);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Shibuya Sky Inn', 4, 42);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Golden Pavilion Inn', 5, 43);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Bamboo Forest Retreat', 4, 43);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Osaka Bay Stay', 3, 44);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Kansai Elegance Inn', 4, 44);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Desert Rose Hotel', 4, 45);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Citadel View Inn', 3, 45);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Ancient Wonders Inn', 3, 46);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Steppe Glory Hotel', 4, 47);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Nomad Palace', 3, 47);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Tien Shan Resort', 4, 48);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Mountain View Inn', 4, 48);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Savannah Breeze Hotel', 3, 49);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Wildlife Lodge', 1, 49);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Indian Ocean Retreat', 3, 50);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Diani Beach Resort', 2, 50);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Ala-Too Plaza Hotel', 4, 51);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Silk Road Hostel', 3, 51);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Issyk-Kul Shore Resort', 2, 52);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Aztec Gold Hotel', 4, 53);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Zocalo Grand Inn', 3, 53);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Riviera Maya Grand', 4, 54);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Caribbean Pearl Resort', 5, 54);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Mariachi Plaza Hotel', 3, 55);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Sky Harbor Inn', 4, 56);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Pacific View Suites', 5, 56);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Downtown Escape Hotel', 3, 56);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Windy City Hotel', 4, 57);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Harbour Lights Inn', 4, 57);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Southern Alps Resort', 5, 58);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Lake Wakatipu Lodge', 4, 58);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Viking Shore Hotel', 5, 59);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Nordic Elegance Inn', 5, 59);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Aurora Sky Suites', 4, 59);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Fjord View Hotel', 5, 60);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Bryggen Inn', 4, 60);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Aurora Lights Inn', 4, 61);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Arctic Dream Resort', 5, 61);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('K-Pop Palace Hotel', 4, 62);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Han River Suites', 5, 62);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Gyeongbok Palace Inn', 3, 62);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Ocean Breeze Hotel', 5, 63);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Diamond Bridge Inn', 4, 63);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Beachside Comfort', 4, 63);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Alpine Elegance Hotel', 5, 64);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Lake Zurich View', 4, 64);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Lake Léman Grand', 5, 64);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Old Town Retreat', 4, 65);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Swiss Charm Inn', 5, 65);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Golden Temple Inn', 4, 66);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Royal Siam Hotel', 5, 66);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('City Blossom Inn', 3, 66);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Andaman Pearl Resort', 4, 67);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Coral Bay Retreat', 5, 67);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Northern Lights Hotel', 3, 68);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Elephant Path Inn', 4, 68);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Carthage Grand Hotel', 4, 69);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Medina Charm Inn', 3, 69);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Mediterranean Dreams', 3, 70);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Pearl of the Sea', 4, 70);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Bosphorus View Hotel', 5, 71);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Hagia Sophia Suites', 4, 71);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Sultanahmet Charm Inn', 3, 71);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Anatolia Palace', 4, 72);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Central Osman', 3, 72);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Turkish Riviera Resort', 3, 73);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Mediterranean Pearl Inn', 5, 73);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Burj Grand Palace', 5, 74);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Desert Oasis Resort', 5, 74);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Marina Bay Inn', 4, 74);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Emirates Elegance', 4, 75);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Sheikh Zayed View Hotel', 5, 75);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Empire State Grand', 5, 76);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Times Square Retreat', 4, 76);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Central Park Inn', 4, 76);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Sunset Boulevard Inn', 4, 77);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Hollywood Dreams Hotel', 5, 77);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Pacific Coast Inn', 4, 77);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Ocean Drive Hotel', 4, 78);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('South Beach Paradise', 4, 78);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Atlantic Breeze Resort', 5, 78);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Hayot Hotel', 4, 79);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('House De Moon', 3, 79);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Aisha hotel', 4, 80);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Gur Emir Palace', 3, 80);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Red River Grand', 4, 81);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Old Quarter Inn', 3, 81);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('West Lake Retreat', 5, 81);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Saigon Pearl Hotel', 4, 82);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Mekong Breeze Inn', 4, 82);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Notre Dame Plaza', 3, 82);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Forbidden City Inn', 4, 83);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Great Wall Grand Hotel', 5, 83);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Tiananmen View Suites', 3, 83);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Bund River View', 5, 84);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Lujiazui Harbor Inn', 4, 84);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Old Town Charm Inn', 3, 84);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Pearl River Hotel', 3, 85);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Canton Elegance Inn', 4, 85);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Malecón Grand Hotel', 4, 86);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Capitolio Charm Inn', 3, 86);

INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('Caribbean Sands Resort', 4, 87);
INSERT INTO Hotels (NAME, StarsNumber, CityId) VALUES ('White Sand Retreat', 3, 87);