using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Models.Forms;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Globalization;
using System.Reflection.PortableExecutable;


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
								StarsNumber = hotel.StarsNumber,
								NutritionTypeId = hotel.NutritionTypeId,
								PhotosDirectory = hotel.Name,
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

								foreach (var file in hotel.PhotosFiles)
								{
									if (file.Length > 0)
									{
										// Генерируем уникальное имя файла
										string uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
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
	}
}
