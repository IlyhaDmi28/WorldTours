using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Models.Forms;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Data;
using System.Globalization;
using System.Reflection.PortableExecutable;
using static System.Net.WebRequestMethods;


namespace backend.Controllers
{
	[Route("hotel")]
	public class HotelController : Controller
	{
		private AppDbContext db;
		public HotelController(AppDbContext context)
		{
			db = context;
		}

		[HttpGet("characteristics")]
		public async Task<IActionResult> GetCharacteristics()
		{
			try
			{
				List<HotelCharacteristic> characteristics = await db.HotelCharacteristics.ToListAsync();

				return Ok(characteristics.Select(hc => new CharacteristicDto
				{
					Id = hc.Id,
					Name = hc.Name,
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Manager, Admin")]
		[HttpPost("add")]
		public async Task<IActionResult> AddHotel([FromForm] HotelForm hotel)
		{
			try
			{
				if (hotel.Id == 0)
				{
					using (var transaction = await db.Database.BeginTransactionAsync())
					{
						try
						{

							List<CharacteristicForm> characteristics = null;
							List<RoomTypeForm> roomTypes = null;

							try
							{
								characteristics = JsonConvert.DeserializeObject<List<CharacteristicForm>>(hotel.Characteristics);
								roomTypes = JsonConvert.DeserializeObject<List<RoomTypeForm>>(hotel.RoomTypes);
							}
							catch { }

							List<int> characteristicIds = characteristics.Select(hc => hc.Id).ToList();
							ICollection<HotelCharacteristic> hotelCharacteristics = await db.HotelCharacteristics
								   .Where(hc => characteristicIds.Contains(hc.Id))
								   .ToListAsync();

							Hotel newHotel = new Hotel()
							{
								Name = hotel.Name,
								MainDescription = hotel.MainDescription,
								CityId = hotel.CityId,
								Address = hotel.Address,
								Lat = (double)hotel.Lat,
								Lng = (double)hotel.Lng,
								StarsNumber = hotel.StarsNumber,
								NutritionTypeId = hotel.NutritionTypeId,
								//PhotosDirectory = hotel.Name,
								Characteristics = hotelCharacteristics,
							};


							await db.Hotels.AddAsync(newHotel);
							await db.SaveChangesAsync();

							var newRoomTypes = roomTypes
								.Select(rt => new RoomType()
								{
									Name = rt.Name,
									SeatsNumber = rt.SeatsNumber,
									RoomsNumber = rt.RoomsNumber,
									Price = rt.Price,
									HotelId = newHotel.Id
								})
								.ToList();

							// Добавляем объекты RoomType без характеристик
							await db.RoomTypes.AddRangeAsync(newRoomTypes);
							await db.SaveChangesAsync(); // Сохраняем, чтобы получить ID новых записей

							// Теперь загружаем характеристики
							foreach (var newRoomType in newRoomTypes)
							{
								var rt = roomTypes.FirstOrDefault(r => r.Name == newRoomType.Name);
								if (rt != null && rt.Characteristics != null && rt.Characteristics.Any())
								{
									newRoomType.Characteristics = await db.RoomTypeCharacteristics
										.Where(rtc => rt.Characteristics.Select(c => c.Id).Contains(rtc.Id))
										.ToListAsync();
								}
							}

							await db.SaveChangesAsync();

							if (hotel.PhotosFiles != null && hotel.PhotosFiles.Count > 0)
							{
								// Создаём папку для загрузок, если её нет
								string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "hotels", hotel.Name);
								if (!Directory.Exists(uploadsFolder))
								{
									Directory.CreateDirectory(uploadsFolder);
								}

								List<string> savedFilePaths = new List<string>();

								int i = 0;
								foreach (var file in hotel.PhotosFiles)
								{
									if (file.Length > 0)
									{
										// Генерируем уникальное имя файла
										string uniqueFileName = $"{i++}.jpg";
										string filePath = Path.Combine(uploadsFolder, uniqueFileName);

										// Сохраняем файл
										using (var fileStream = new FileStream(filePath, FileMode.Create))
										{
											await file.CopyToAsync(fileStream);
										}

										savedFilePaths.Add($"/uploads/hotels/{hotel.Name}/{uniqueFileName}"); // Относительный путь для клиента
									}
								}

							}

							await transaction.CommitAsync();
							return Ok();
						}
						catch
						{
							await transaction.RollbackAsync();
							return BadRequest();
						}
					}
				}

				return BadRequest();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("hotels_for_editor")]
		public async Task<IActionResult> GetHotels()
		{
			try
			{
				List<Hotel> hotels = await db.Hotels
					.Include(h => h.City)
					.ThenInclude(c => c.Country)
					.ToListAsync();

				return Ok(hotels.Select(h=> new HotelForEditCardDto()
				{
					Id = h.Id,
					Name = h.Name,
					City = h.City.Name,
					Country = h.City.Country.Name,
					Address = h.Address,
					StarsNumber = h.StarsNumber,
					PhotoUrl = $"https://localhost:7276/uploads/hotels/{h.Name}/0.jpg"
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}


		[HttpGet("hotel_for_editor")]
		public async Task<IActionResult> GetHotel([FromQuery] int? hotelId = null)
		{
			try
			{
				HotelForEditorDto hotelForEditorDto = null;
				if (hotelId == 0)
				{
					hotelForEditorDto = new HotelForEditorDto()
					{
						Id = 0,
						Name = "",
						MainDescription = string.Empty,
						CityId = null,
						NutritionTypeId = 1,
						StarsNumber = 1,
						Lat = 53.89196,
						Lng = 27.55760,
						Address = string.Empty,
						PhotosUrls = null,
						Characteristics = new List<CharacteristicDto>(),
						RoomTypes = new List<RoomTypeDto>(),
					};
				}
				else
				{
					Hotel hotel = await db.Hotels
						.Include(h => h.Characteristics)
						.Include(h => h.City)
						.Include(h => h.RoomTypes)
						.ThenInclude(rt => rt.Characteristics)
						.FirstOrDefaultAsync(h => h.Id == hotelId);

					if (hotel == null) return NotFound();

					string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "hotels", hotel.Name);

					List<string> fileNames = new List<string>();
					List<string> fileUrls = new List<string>();
					// Проверяем, существует ли папка
					if (Directory.Exists(folderPath))
					{
						// Получаем все файлы из папки
						string[] files = Directory.GetFiles(folderPath);
						
						// Создаём список только с названиями файлов
						fileNames = files.Select(Path.GetFileName).ToList();
					}
					else
					{
						Console.WriteLine("Папка не найдена.");
					}

					foreach (string fileName in fileNames)
					{
						fileUrls.Add($"https://localhost:7276/uploads/hotels/{hotel.Name}/{fileName}");
					}

					hotelForEditorDto = new HotelForEditorDto
					{
						Id = hotel.Id,
						Name = hotel.Name,
						MainDescription = hotel.MainDescription,
						CityId = hotel.CityId,
						Address = hotel.Address,
						Lat = hotel.Lat,
						Lng = hotel.Lng,
						NutritionTypeId = hotel.NutritionTypeId,
						StarsNumber = hotel.StarsNumber,
						Characteristics = hotel.Characteristics.Select(c => new CharacteristicDto { Id = c.Id, Name = c.Name }).ToList(),
						RoomTypes = hotel.RoomTypes.Select(rt => new RoomTypeDto
						{
							Id = rt.Id,
							Name = rt.Name,
							SeatsNumber = rt.SeatsNumber,
							RoomsNumber = rt.RoomsNumber,
							Price = rt.Price,
							Characteristics = rt.Characteristics.Select(c => new CharacteristicDto { Id = c.Id, Name = c.Name }).ToList()
						}).ToList(),
						PhotosUrls = fileUrls
					};
				}

				return Ok(hotelForEditorDto);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("filtred_hotels")]
		public async Task<IActionResult> GetFiltredHotels([FromBody] HotelFilterForm filter)
		{
			try
			{
				List<Hotel> hotels = await db.Hotels
					.Include(h => h.City)
					.ThenInclude(c => c.Country)
					.ToListAsync();


				if (filter != null)
				{
					if (filter.CityId != 0 && filter.CityId != null) hotels = hotels.Where(h => h.CityId == filter.CityId).ToList();
					if (filter.CountryId != 0 && filter.CountryId != null) hotels = hotels.Where(h => h.City.CountryId == filter.CountryId).ToList();
					if (filter.MinStarsNumber != 0 && filter.MinStarsNumber != null) hotels = hotels.Where(h => h.StarsNumber >= filter.MinStarsNumber).ToList();
					if (filter.MaxStarsNumber != 0 && filter.MaxStarsNumber != null) hotels = hotels.Where(h => h.StarsNumber <= filter.MaxStarsNumber).ToList();

				}

				return Ok(hotels.Select(h => new HotelForEditCardDto()
				{
					Id = h.Id,
					Name = h.Name,
					City = h.City.Name,
					Country = h.City.Country.Name,
					Address = h.Address,
					StarsNumber = h.StarsNumber,
					PhotoUrl = $"https://localhost:7276/uploads/hotels/{h.Name}/0.jpg"
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		//[Authorize(Roles = "Manager, Admin")]
		//[HttpPut("edit")]
		//public async Task<IActionResult> EditHotel([FromForm] HotelForm hotel)
		//{
		//	try
		//	{
		//		if (hotel.Id != 0)
		//		{
		//			using (var transaction = await db.Database.BeginTransactionAsync())
		//			{
		//				try
		//				{

		//					Hotel editedHotel = await db.Hotels.FirstOrDefaultAsync(h => h.Id == hotel.Id);

		//					if (editedHotel == null) return NotFound();

		//					List<CharacteristicForm> characteristics  = JsonConvert.DeserializeObject<List<CharacteristicForm>>(hotel.Characteristics);
		//					List<RoomTypeForm> roomTypes = JsonConvert.DeserializeObject<List<RoomTypeForm>>(hotel.RoomTypes);

		//					List<int> characteristicIds = characteristics.Select(hc => hc.Id).ToList();
		//					ICollection<HotelCharacteristic> hotelCharacteristics = await db.HotelCharacteristics
		//						   .Where(hc => characteristicIds.Contains(hc.Id))
		//						   .ToListAsync();

		//					db.Database.ExecuteSqlRaw("DELETE FROM HotelDescriptions WHERE HotelID = {0}", hotel.Id);

		//					editedHotel.Name = hotel.Name;
		//					editedHotel.MainDescription = hotel.MainDescription;
		//					editedHotel.CityId = hotel.CityId;
		//					editedHotel.Address = hotel.Address;
		//					editedHotel.StarsNumber = hotel.StarsNumber;
		//					editedHotel.NutritionTypeId = hotel.NutritionTypeId;
		//					editedHotel.PhotosDirectory = hotel.Name;
		//					editedHotel.Characteristics = hotelCharacteristics;

		//					await db.SaveChangesAsync();

		//					List<RoomType> editedRoomTypes = await db.RoomTypes
		//						.Where(rt => roomTypes.Select(rt2 => rt2.Id).ToList().Contains(rt.Id))
		//						.ToListAsync();

		//					List<RoomType> allRoomTypesForHotel = await db.RoomTypes
		//						.Where(rt => rt.HotelId == hotel.Id)
		//						.ToListAsync();

		//					List<RoomType> deletedRoomTypes = await db.RoomTypes.Where(rt => rt.HotelId == hotel.Id)
		//						.Where(rt => !roomTypes.Select(rt2 => rt2.Id).ToList().Contains(rt.Id))
		//						.ToListAsync();

		//					foreach (RoomType roomType in allRoomTypesForHotel)
		//					{
		//						db.Database.ExecuteSqlRaw("DELETE FROM RoomTypeDescriptions WHERE RoomTypeID = {0}", roomType.Id);

		//					}

		//					db.RoomTypes.RemoveRange(deletedRoomTypes);

		//					await db.SaveChangesAsync();

		//					for (int i = 0; i < editedRoomTypes.Count; i++)
		//					{
		//						editedRoomTypes[i].Name = roomTypes[i].Name;
		//						editedRoomTypes[i].SeatsNumber = roomTypes[i].SeatsNumber;
		//						editedRoomTypes[i].RoomsNumber = roomTypes[i].RoomsNumber;
		//						editedRoomTypes[i].Price = roomTypes[i].Price;

		//						//db.Database.ExecuteSqlRaw("DELETE FROM RoomTypeDescriptions WHERE RoomTypeID = {0}", editedRoomTypes[i].Id);

		//						editedRoomTypes[i].Characteristics = roomTypes[i].Characteristics.Select(c => new RoomTypeCharacteristic
		//						{
		//							Id = c.Id,
		//							Name = c.Name,
		//						}).ToList();
		//					}

		//					await db.SaveChangesAsync();

		//					if (editedRoomTypes.Count != roomTypes.Count)
		//					{
		//						var newRoomTypes = roomTypes.Where(rt => rt.Id == 0)
		//						.Select(rt => new RoomType()
		//						{
		//							Name = rt.Name,
		//							SeatsNumber = rt.SeatsNumber,
		//							RoomsNumber = rt.RoomsNumber,
		//							Price = rt.Price,
		//							HotelId = hotel.Id
		//						})
		//						.ToList();

		//						// Добавляем объекты RoomType без характеристик
		//						await db.RoomTypes.AddRangeAsync(newRoomTypes);
		//						await db.SaveChangesAsync(); // Сохраняем, чтобы получить ID новых записей

		//						// Теперь загружаем характеристики
		//						foreach (var newRoomType in newRoomTypes)
		//						{
		//							var rt = roomTypes.FirstOrDefault(r => r.Name == newRoomType.Name);
		//							if (rt != null && rt.Characteristics != null && rt.Characteristics.Any())
		//							{
		//								newRoomType.Characteristics = await db.RoomTypeCharacteristics
		//									.Where(rtc => rt.Characteristics.Select(c => c.Id).Contains(rtc.Id))
		//									.ToListAsync();
		//							}
		//						}

		//						await db.SaveChangesAsync();
		//					}


		//					if (hotel.PhotosFiles != null && hotel.PhotosFiles.Count > 0)
		//					{
		//						// Создаём папку для загрузок, если её нет
		//						string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "hotels", hotel.Name);
		//						if (!Directory.Exists(uploadsFolder))
		//						{
		//							Directory.CreateDirectory(uploadsFolder);
		//						}

		//						List<string> savedFilePaths = new List<string>();

		//						int i = 0;
		//						foreach (var file in hotel.PhotosFiles)
		//						{
		//							if (file.Length > 0)
		//							{
		//								// Генерируем уникальное имя файла
		//								string uniqueFileName = $"{i++}.jpg";
		//								string filePath = Path.Combine(uploadsFolder, uniqueFileName);

		//								// Сохраняем файл
		//								using (var fileStream = new FileStream(filePath, FileMode.Create))
		//								{
		//									await file.CopyToAsync(fileStream);
		//								}

		//								savedFilePaths.Add($"/uploads/hotels/{hotel.Name}/{uniqueFileName}"); // Относительный путь для клиента
		//							}
		//						}
		//					}

		//					await transaction.CommitAsync();
		//					return Ok();
		//				}
		//				catch (Exception ex)
		//				{

		//					await transaction.RollbackAsync();
		//					return BadRequest();
		//				}
		//			}
		//		}
		//		return BadRequest();
		//	}
		//	catch (Exception ex)
		//	{
		//		return BadRequest(ex.Message);
		//	}
		//}

		[Authorize(Roles = "Manager, Admin")]
		[HttpPut("edit")]
		public async Task<IActionResult> EditHotel([FromForm] HotelForm hotel)
		{
			try
			{
				if (hotel.Id == 0) return BadRequest("Invalid hotel ID.");

				using (var transaction = await db.Database.BeginTransactionAsync())
				{
					try
					{
						Hotel editedHotel = await db.Hotels.FirstOrDefaultAsync(h => h.Id == hotel.Id);
						if (editedHotel == null) return NotFound();

						// Десериализация характеристик и типов номеров
						var characteristics = JsonConvert.DeserializeObject<List<CharacteristicForm>>(hotel.Characteristics);
						var roomTypes = JsonConvert.DeserializeObject<List<RoomTypeForm>>(hotel.RoomTypes);

						// Получение характеристик за один запрос
						var hotelCharacteristics = await db.HotelCharacteristics
							.Where(hc => characteristics.Select(c => c.Id).Contains(hc.Id))
							.ToListAsync();

						// Обновление данных отеля
						db.Database.ExecuteSqlRaw("DELETE FROM HotelDescriptions WHERE HotelID = {0}", hotel.Id);
						editedHotel.Name = hotel.Name;
						editedHotel.MainDescription = hotel.MainDescription;
						editedHotel.CityId = hotel.CityId;
						editedHotel.Address = hotel.Address;
						editedHotel.Lat = (double)hotel.Lat;
						editedHotel.Lng = (double)hotel.Lng;
						editedHotel.StarsNumber = hotel.StarsNumber;
						editedHotel.NutritionTypeId = hotel.NutritionTypeId;
						//editedHotel.PhotosDirectory = hotel.Name;
						editedHotel.Characteristics = hotelCharacteristics;

						await db.SaveChangesAsync();

						//List<RoomType> editedRoomTypes = await db.RoomTypes
						//.Where(rt => roomTypes.Select(rt2 => rt2.Id).ToList().Contains(rt.Id))
						//.ToListAsync();

						//List<RoomType> allRoomTypesForHotel = await db.RoomTypes
						//	.Where(rt => rt.HotelId == hotel.Id)
						//	.ToListAsync();

						//List<RoomType> deletedRoomTypes = await db.RoomTypes.Where(rt => rt.HotelId == hotel.Id)
						//	.Where(rt => !roomTypes.Select(rt2 => rt2.Id).ToList().Contains(rt.Id))
						//	.ToListAsync();

						var allRoomTypesForHotel = await db.RoomTypes
							.Where(rt => rt.HotelId == hotel.Id)
							.Include(rt => rt.Characteristics)
							.ToListAsync();

						var editedRoomTypes = allRoomTypesForHotel.Where(rt => roomTypes.Any(rt2 => rt2.Id == rt.Id)).ToList();
						var deletedRoomTypes = allRoomTypesForHotel.Where(rt => !roomTypes.Any(rt2 => rt2.Id == rt.Id)).ToList();

						foreach (RoomType roomType in allRoomTypesForHotel)
						{
							db.Database.ExecuteSqlRaw("DELETE FROM RoomTypeDescriptions WHERE RoomTypeID = {0}", roomType.Id);

						}
						await db.SaveChangesAsync();
						db.ChangeTracker.Clear();
						editedRoomTypes = await db.RoomTypes
							.Where(rt => roomTypes.Select(rt2 => rt2.Id).Contains(rt.Id))
							.Include(rt => rt.Characteristics)
							.ToListAsync();
						//db.Database.ExecuteSqlRaw("DELETE FROM RoomTypeDescriptions WHERE RoomTypeID IN ({0})",
						//	string.Join(",", allRoomTypesForHotel.Select(rt => rt.Id)));

						db.RoomTypes.RemoveRange(deletedRoomTypes);

						await db.SaveChangesAsync();

						foreach (var editedRoomType in editedRoomTypes)
						{
							var roomType = roomTypes.First(rt => rt.Id == editedRoomType.Id);

							editedRoomType.Name = roomType.Name;
							editedRoomType.SeatsNumber = roomType.SeatsNumber;
							editedRoomType.RoomsNumber = roomType.RoomsNumber;
							editedRoomType.Price = roomType.Price;

							//editedRoomType.Characteristics.Clear();
							//await db.SaveChangesAsync(); // Сохраняем изменения, чтобы удалить связи в БД

							//editedRoomType.Characteristics = roomType.Characteristics.Select(c => new RoomTypeCharacteristic
							//{
							//	Id = c.Id,
							//	Name = c.Name,
							//}).ToList();

							editedRoomType.Characteristics = roomType.Characteristics
								.Select(c => 
									db.RoomTypeCharacteristics.Local.FirstOrDefault(rc => rc.Id == c.Id) 
									?? db.RoomTypeCharacteristics.Attach(new RoomTypeCharacteristic
									{
										Id = c.Id,
										Name = c.Name
									}).Entity)
								.ToList();
						}

						await db.SaveChangesAsync();

						if (editedRoomTypes.Count != roomTypes.Count)
						{
							var newRoomTypes = roomTypes.Where(rt => rt.Id == 0)
							.Select(rt => new RoomType()
							{
								Name = rt.Name,
								SeatsNumber = rt.SeatsNumber,
								RoomsNumber = rt.RoomsNumber,
								Price = rt.Price,
								HotelId = hotel.Id
							})
							.ToList();

							// Добавляем объекты RoomType без характеристик
							await db.RoomTypes.AddRangeAsync(newRoomTypes);
							await db.SaveChangesAsync(); // Сохраняем, чтобы получить ID новых записей

							// Теперь загружаем характеристики
							foreach (var newRoomType in newRoomTypes)
							{
								var rt = roomTypes.FirstOrDefault(r => r.Name == newRoomType.Name);
								if (rt != null && rt.Characteristics != null && rt.Characteristics.Any())
								{
									newRoomType.Characteristics = await db.RoomTypeCharacteristics
										.Where(rtc => rt.Characteristics.Select(c => c.Id).Contains(rtc.Id))
										.ToListAsync();
								}
							}

							await db.SaveChangesAsync();
						}

						// Получаем все типы номеров отеля
						//var allRoomTypesForHotel = await db.RoomTypes
						//	.Where(rt => rt.HotelId == hotel.Id)
						//	.ToListAsync();

						//var editedRoomTypes = allRoomTypesForHotel.Where(rt => roomTypes.Any(rt2 => rt2.Id == rt.Id)).ToList();
						//var deletedRoomTypes = allRoomTypesForHotel.Where(rt => !roomTypes.Any(rt2 => rt2.Id == rt.Id)).ToList();

						//for (int i = 0; i < editedRoomTypes.Count; i++)
						//{
						//	editedRoomTypes[i].Name = roomTypes[i].Name;
						//	editedRoomTypes[i].SeatsNumber = roomTypes[i].SeatsNumber;
						//	editedRoomTypes[i].RoomsNumber = roomTypes[i].RoomsNumber;
						//	editedRoomTypes[i].Price = roomTypes[i].Price;

						//	//db.Database.ExecuteSqlRaw("DELETE FROM RoomTypeDescriptions WHERE RoomTypeID = {0}", editedRoomTypes[i].Id);

						//	editedRoomTypes[i].Characteristics = roomTypes[i].Characteristics.Select(c => new RoomTypeCharacteristic
						//	{
						//		Id = c.Id,
						//		Name = c.Name,
						//	}).ToList();
						//}

						//await db.SaveChangesAsync();

						//if (editedRoomTypes.Count != roomTypes.Count)
						//{
						//	var newRoomTypes = roomTypes.Where(rt => rt.Id == 0)
						//	.Select(rt => new RoomType()
						//	{
						//		Name = rt.Name,
						//		SeatsNumber = rt.SeatsNumber,
						//		RoomsNumber = rt.RoomsNumber,
						//		Price = rt.Price,
						//		HotelId = hotel.Id
						//	})
						//	.ToList();

						//	// Добавляем объекты RoomType без характеристик
						//	await db.RoomTypes.AddRangeAsync(newRoomTypes);
						//	await db.SaveChangesAsync(); // Сохраняем, чтобы получить ID новых записей



						//								 // Разделение на удаляемые и редактируемые номера
							

						//// Удаление описаний номеров перед изменением
						//db.Database.ExecuteSqlRaw("DELETE FROM RoomTypeDescriptions WHERE RoomTypeID IN ({0})",
						//	string.Join(",", allRoomTypesForHotel.Select(rt => rt.Id)));

						//// Удаление типов номеров
						//db.RoomTypes.RemoveRange(deletedRoomTypes);
						//await db.SaveChangesAsync();

						//// Обновление существующих номеров
						//foreach (var rt in editedRoomTypes)
						//{
						//	var formRoom = roomTypes.First(r => r.Id == rt.Id);
						//	rt.Name = formRoom.Name;
						//	rt.SeatsNumber = formRoom.SeatsNumber;
						//	rt.RoomsNumber = formRoom.RoomsNumber;
						//	rt.Price = formRoom.Price;
						//	rt.Characteristics = formRoom.Characteristics.Select(c => new RoomTypeCharacteristic
						//	{
						//		Id = c.Id,
						//		Name = c.Name,
						//	}).ToList();
						//}

						//await db.SaveChangesAsync();

						//// Добавление новых номеров
						//var newRoomTypes = roomTypes
						//	.Where(rt => rt.Id == 0)
						//	.Select(rt => new RoomType
						//	{
						//		Name = rt.Name,
						//		SeatsNumber = rt.SeatsNumber,
						//		RoomsNumber = rt.RoomsNumber,
						//		Price = rt.Price,
						//		HotelId = hotel.Id
						//	})
						//	.ToList();

						//await db.RoomTypes.AddRangeAsync(newRoomTypes);
						//await db.SaveChangesAsync();

						// Привязываем характеристики к новым номерам
						//foreach (var newRoom in newRoomTypes)
						//{
						//	var formRoom = roomTypes.FirstOrDefault(rt => rt.Name == newRoom.Name);
						//	if (formRoom?.Characteristics?.Any() == true)
						//	{
						//		newRoom.Characteristics = await db.RoomTypeCharacteristics
						//			.Where(rtc => formRoom.Characteristics.Select(c => c.Id).Contains(rtc.Id))
						//			.ToListAsync();
						//	}
						//}

						await db.SaveChangesAsync();

						// Обработка загрузки фотографий
						if (hotel.PhotosFiles?.Count > 0)
						{
							string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "hotels", hotel.Name);
							if (Directory.Exists(uploadsFolder))
							{
								foreach (string file in Directory.GetFiles(uploadsFolder))
								{
									System.IO.File.Delete(file);
								}
							}
							else Directory.CreateDirectory(uploadsFolder);

							for (int i = 0; i < hotel.PhotosFiles.Count; i++)
							{
								var file = hotel.PhotosFiles[i];
								if (file.Length > 0)
								{
									string filePath = Path.Combine(uploadsFolder, $"{i}.jpg");
									using var fileStream = new FileStream(filePath, FileMode.Create);
									await file.CopyToAsync(fileStream);
								}
							}
						}

						await transaction.CommitAsync();
						return Ok();
					}
					catch (Exception ex)
					{
						await transaction.RollbackAsync();
						return BadRequest();
					}
				}
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Manager, Admin")]
		[HttpDelete("delete")]
		public async Task<IActionResult> DeleteHotel([FromQuery] int? hotelId)
		{
			try
			{
				using (var transaction = await db.Database.BeginTransactionAsync())
				{
					try
					{
						Hotel deletedHotel = await db.Hotels.Include(h => h.RoomTypes).FirstOrDefaultAsync(h => h.Id == hotelId);
						if (deletedHotel == null) return NotFound();

						foreach (RoomType roomType in deletedHotel.RoomTypes)
						{
							db.Database.ExecuteSqlRaw("DELETE FROM RoomTypeDescriptions WHERE RoomTypeID = {0}", roomType.Id);
						}

						db.Database.ExecuteSqlRaw("DELETE FROM HotelDescriptions WHERE HotelID = {0}", hotelId);

						db.Hotels.Remove(deletedHotel);
						await db.SaveChangesAsync();
						await transaction.CommitAsync();

						return Ok();
					}
					catch
					{
						await transaction.RollbackAsync();
						return BadRequest();
					}
				}
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
