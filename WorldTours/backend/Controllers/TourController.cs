using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Models.Forms;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection.PortableExecutable;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Route = backend.Models.Entity.Route;

namespace backend.Controllers
{
	[Route("tour")]
	public  class TourController : Controller
	{
		private AppDbContext db;
		public TourController(AppDbContext context)
		{
			db = context;
		}

		[HttpGet("tour_types")]
		public async Task<IActionResult> GetTourTypes()
		{
			try
			{
				List<TourType> tourTypes = await db.TourTypes.ToListAsync();

				return Ok(tourTypes.Select(tt => new TourTypeDto
				{
					Id = tt.Id,
					Name = tt.Name,
					ImageUrl = $"https://localhost:7276/{tt.PathToImage}",
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("characteristics")]
		public async Task<IActionResult> GetCharacteristics()
		{
			try
			{
				List<TourCharacteristic> characteristics = await db.TourCharacteristics.ToListAsync(); 

				return Ok(characteristics.Select(c => new CharacteristicDto
				{
					Id = c.Id,
					Name = c.Name,
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("nutrition_types")]
		public async Task<IActionResult> GetNutritionTypes()
		{
			try
			{
				List<NutritionType> nutritionTypes = await db.NutritionTypes
					.OrderBy(nt => nt.Id)
					.ToListAsync();

				return Ok(nutritionTypes.Select(nt => new NutritionTypeDto
				{
					Id = nt.Id,
					Name = nt.Name,
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Manager, Admin")]
		[HttpGet("tour_for_editor")]
		public async Task<IActionResult> GetTourForEditor([FromQuery] int? tourId = null)
		{
			try
			{
				TourForEditorDto tourForEditor;
				if (tourId == 0)
				{
					tourForEditor = new TourForEditorDto()
					{
						Id = 0,
						Name = "",
						MainDescription = string.Empty,
						HotelId = null,
						TourTypeId = 1,
						PhotosUrls = null,
						Routes = new List<RouteDto>(),
						Characteristics = new List<CharacteristicDto>(),
					};
				}
				else
				{
					Tour tour = await db.Tours
						.Include(t => t.Characteristics)
						.FirstOrDefaultAsync(t => t.Id == tourId);

					if (tour == null) return NotFound();

					List<Route> routes = await db.Routes
						.Include(r => r.DepartmentDeparture)
						.ThenInclude(d => d.City)
						.ThenInclude(c => c.Country)
						.Include(r => r.DepartmentDeparture)
						.ThenInclude(d => d.TransportType)
						.Where(r => r.TourId == tourId)
						.ToListAsync();

					string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "tours", tour.Id.ToString());

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
						fileUrls.Add($"https://localhost:7276/uploads/tours/{tour.Id}/{fileName}");
					}

					tourForEditor = new TourForEditorDto()
					{
						Id = tour.Id,
						Name = tour.Name,
						MainDescription = tour.MainDescription,
						HotelId = tour.HotelId,
						TourTypeId = tour.TourTypeId,
						PhotosUrls = fileUrls,
						Characteristics = tour.Characteristics.Select(c => new CharacteristicDto { Id = c.Id, Name = c.Name }).ToList(),
						Routes = routes.Select(r => new RouteDto()
						{
							Id = r.Id,
							LandingDateOfDeparture = r.LandingDateOfDeparture?.ToString("dd.MM.yyyy"),
							LandingDateOfReturn = r.LandingDateOfReturn?.ToString("dd.MM.yyyy"),
							LandingTimeOfDeparture = r.LandingTimeOfDeparture?.ToString(@"hh\:mm"),
							LandingTimeOfReturn = r.LandingTimeOfReturn?.ToString(@"hh\:mm"),
							ArrivalDateOfDeparture = r.ArrivalDateOfDeparture?.ToString("dd.MM.yyyy"),
							ArrivalDateOfReturn = r.ArrivalDateOfReturn?.ToString("dd.MM.yyyy"),
							ArrivalTimeOfDeparture = r.ArrivalTimeOfDeparture?.ToString(@"hh\:mm"),
							ArrivalTimeOfReturn = r.ArrivalTimeOfReturn?.ToString(@"hh\:mm"),
							Price = r.Price,
							SeatsNumber = r.SeatsNumber,
							TransportType = new TransportTypeDto
							{
								Id = r.DepartmentDeparture.TransportType?.Id ?? 0,
								Name = r.DepartmentDeparture.TransportType?.Name
							},
							DepartmentDeparture = new DepartmentDepartureDto
							{
								Id = r.DepartmentDeparture?.Id ?? 0,
								Name = r.DepartmentDeparture?.Name,
								City = r.DepartmentDeparture?.City?.Name,
								Country = r.DepartmentDeparture?.City?.Country?.Name
							}
						}).ToList(),
					};
				}

				return Ok(tourForEditor);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}


		//[HttpGet("get")]
		//public async Task<IActionResult> GetTour([FromQuery] int? tourId = null)
		//{
		//	try
		//	{
		//		Tour tour = await db.Tours
		//			.Include(t => t.TourType)
		//			.Include(t => t.NutritionType)
		//			.Include(t => t.Hotel)
		//			.ThenInclude(h => h.City)
		//			.ThenInclude(c => c.Country)
		//			.FirstOrDefaultAsync(t => t.Id == tourId);

		//		if (tour == null) return NotFound();

		//		List<Route> routes = await db.Routes
		//			.Include(r => r.TransportType)
		//			.Include(r => r.DepartmentDeparture)
		//			.ThenInclude(d => d.City)
		//			.ThenInclude(c => c.Country)
		//			.Where(r => r.TourId == tourId)
		//			.ToListAsync();

		//		List<TourDescription> descriptions = await db.Descriptions
		//			.Include(d => d.Characteristic)
		//			.ThenInclude(c => c.CharacteristicType)
		//			.Where(d => d.TourId == tourId && d.Value)
		//			.ToListAsync();


		//		return Ok(new TourDto
		//		{
		//			Id = tour.Id,
		//			Name = tour.Name,
		//			PhotoUrl = PhotoService.ConvertToBase64(tour.Photo, "png"),
		//			MainDescription = tour.MainDescription,
		//			NutritionType = tour.NutritionType?.Name,
		//			Direction = new DirectionDto
		//			{
		//				Country = tour.Hotel.City.Country?.Name,
		//				City = tour.Hotel.City?.Name,
		//				Hotel = tour.Hotel?.Name,
		//				StarsNumber = tour.Hotel?.StarsNumber ?? 0
		//			},
		//			Routes = routes.Select(r => new RouteDto
		//			{
		//				Id = r.Id,
		//				LandingDateOfDeparture = r.LandingDateOfDeparture?.ToString("dd.MM.yyyy"),
		//				LandingDateOfReturn = r.LandingDateOfReturn?.ToString("dd.MM.yyyy"),
		//				LandingTimeOfDeparture = r.LandingTimeOfDeparture?.ToString(@"hh\:mm"),
		//				LandingTimeOfReturn = r.LandingTimeOfReturn?.ToString(@"hh\:mm"),
		//				ArrivalDateOfDeparture = r.ArrivalDateOfDeparture?.ToString("dd.MM.yyyy"),
		//				ArrivalDateOfReturn = r.ArrivalDateOfReturn?.ToString("dd.MM.yyyy"),
		//				ArrivalTimeOfDeparture = r.ArrivalTimeOfDeparture?.ToString(@"hh\:mm"),
		//				ArrivalTimeOfReturn = r.ArrivalTimeOfReturn?.ToString(@"hh\:mm"),
		//				Price = r.Price,
		//				SeatsNumber = r.SeatsNumber,
		//				TransportType = new TransportTypeDto
		//				{
		//					Id = r.TransportType?.Id ?? 0,
		//					Name = r.TransportType?.Name
		//				},
		//				DepartmentDeparture = new DepartmentDepartureDto
		//				{
		//					Id = r.DepartmentDeparture?.Id ?? 0,
		//					Name = r.DepartmentDeparture?.Name,
		//					City = r.DepartmentDeparture?.City?.Name,
		//					Country = r.DepartmentDeparture?.City?.Country?.Name
		//				}
		//			}).ToList(),
		//			Descriptions = descriptions
		//				.GroupBy(d => d.Characteristic.CharacteristicType)
		//				.Select(g => new CharacteristicTypeWithDescriptions
		//				{
		//					Id = g.Key?.Id ?? 0,
		//					Name = g.Key?.Name,
		//					Descriptions = g.Select(d => new DescriptionWithCharacteriscDto
		//					{
		//						Characteristic = new CharacteristicDto
		//						{
		//							Id = d.Characteristic?.Id ?? 0,
		//							Name = d.Characteristic?.Name
		//						},
		//						Description = new DescriptionDto
		//						{
		//							Id = d.Id,
		//							Value = d.Value
		//						}
		//					}).ToList()
		//				}).ToList()
		//		});
		//	}
		//	catch (Exception ex)
		//	{
		//		return BadRequest(ex.Message);
		//	}
		//}


		//[HttpGet("tours")]
		//public async Task<IActionResult> GetTours()
		//{
		//	try
		//	{
		//		List<Route> routes = await db.Routes
		//			.Include(r => r.Tour)
		//			.ThenInclude(t => t.Hotel) 
		//			.ThenInclude(h => h.City) 
		//			.ThenInclude(c => c.Country) 
		//			.Where(r => r.SeatsNumber > 0 &&  r.LandingDateOfDeparture > DateTime.Now)
		//			.OrderBy(r => r.SeatsNumber)
		//			.ToListAsync();

		//		return Ok(routes.Select(t => new TourCardDto
		//		{
		//			Id = t.Tour.Id,
		//			RouteId = t.Id,
		//			Name = t.Tour.Name,
		//			Country = t.Tour.Hotel.City.Country.Name,
		//			City = t.Tour.Hotel.City.Name,
		//			PhotoUrl = PhotoService.ConvertToBase64(t.Tour.Photo, "jpeg"),
		//			DateOfDeparture = ((DateTime)t.LandingDateOfDeparture).ToString("dd.MM.yyyy"),
		//			DateOfReturn = ((DateTime)t.ArrivalDateOfReturn).ToString("dd.MM.yyyy"),
		//			StarsNumber = t.Tour.Hotel.StarsNumber,
		//			Price = t.Price,
		//		}));
		//	}
		//	catch (Exception ex)
		//	{
		//		return BadRequest(ex.Message);
		//	}
		//}

		//[HttpPost("filtred_tours")]
		//public async Task<IActionResult> GetFiltredTours([FromBody] FilterForm filter)
		//{
		//	try
		//	{
		//		List<Tour> tours = await db.Tours.Include(t => t.Descriptions).ToListAsync();

		//		List<Route> routes = await db.Routes
		//			.Include(r => r.DepartmentDeparture)
		//			.Include(r => r.Tour)
		//			.ThenInclude(t => t.Hotel) 
		//			.ThenInclude(h => h.City) 
		//			.ThenInclude(c => c.Country)
		//			.Where(r => r.SeatsNumber > 0)
		//			.OrderBy(r => r.SeatsNumber)
		//			.ToListAsync();

		//		foreach (Tour tour in tours)
		//		{
		//			foreach (Route route in routes)
		//			{
		//				if (route.TourId == tour.Id) route.Tour = tour;
		//			}
		//		}


		//		List<Route> filtredRoutes = new List<Route>();
		//		if (filter != null)
		//		{
		//			if (filter.CityId != 0 && filter.CityId != null) routes = routes.Where(t => t.Tour.Hotel.CityId == filter.CityId).ToList();
		//			if (filter.CountryId != 0 && filter.CountryId != null) routes = routes.Where(t => t.Tour.Hotel.City.CountryId == filter.CountryId).ToList();
		//			if (filter.DepartureCityId != 0 && filter.DepartureCityId != null) routes = routes.Where(t => t.DepartmentDeparture.CityId == filter.DepartureCityId).ToList();
		//			if (filter.MinDateOfDeparture != null && filter.MinDateOfDeparture != "") routes = routes.Where(t => t.LandingDateOfDeparture >= DateService.ConvertToDateFormat(filter.MinDateOfDeparture)).ToList();
		//			if (filter.MaxDateOfDeparture != null && filter.MaxDateOfDeparture != "") routes = routes.Where(t => t.LandingDateOfDeparture <= DateService.ConvertToDateFormat(filter.MaxDateOfDeparture)).ToList();
		//			if (filter.TransportTypeId != 0 && filter.TransportTypeId != null) routes = routes.Where(t => t.TransportTypeId == filter.TransportTypeId).ToList();
		//			if (filter.TourTypeId != 0 && filter.TourTypeId != null) routes = routes.Where(t => t.Tour.TourTypeId == filter.TourTypeId).ToList();
		//			if (filter.MinPrice != 0 && filter.MinPrice != null) routes = routes.Where(t => t.Price >= filter.MinPrice).ToList();
		//			if (filter.MaxPrice != 0 && filter.MaxPrice != null) routes = routes.Where(t => t.Price <= filter.MaxPrice).ToList();
		//			if (filter.MinHotelStars != 0 && filter.MinHotelStars != null) routes = routes.Where(t => t.Tour.Hotel.StarsNumber >= filter.MinHotelStars).ToList();
		//			if (filter.MaxHotelStars != 0 && filter.MaxHotelStars != null) routes = routes.Where(t => t.Tour.Hotel.StarsNumber <= filter.MaxHotelStars).ToList();
		//			if (filter.NutritionTypeId != 0 && filter.NutritionTypeId != null) routes = routes.Where(t => t.Tour.NutritionTypeId == filter.NutritionTypeId).ToList();

		//			filtredRoutes = routes.ToList();
		//			if (filter.Descriptions != null)
		//			{
		//				foreach (Route route in routes)
		//				{
		//					foreach (TourDescription description in route.Tour.Descriptions)
		//					{
		//						foreach (DescriptionForFilterDto descriptionForFilter in filter.Descriptions)
		//						{
		//							switch ((int)descriptionForFilter.Value)
		//							{
		//								case 0:
		//									{
		//										continue;
		//									}
		//								case 1:
		//									{
		//										if (descriptionForFilter.CharacteristicId == description.CharacteristicId && !description.Value) filtredRoutes.Remove(route);
		//										break;
		//									}
		//								case 2:
		//									{
		//										if (descriptionForFilter.CharacteristicId == description.CharacteristicId && description.Value) filtredRoutes.Remove(route);
		//										break;
		//									}
		//								default:
		//									{
		//										continue;
		//									}
		//							}
		//						}
		//					}
		//				}
		//			}
		//		}

		//		return Ok(filtredRoutes.Select(t => new TourCardDto
		//		{
		//			Id = t.Tour.Id,
		//			RouteId = t.Id,
		//			Name = t.Tour.Name,
		//			Country = t.Tour.Hotel.City.Country.Name,
		//			City = t.Tour.Hotel.City.Name,
		//			PhotoUrl = PhotoService.ConvertToBase64(t.Tour.Photo, "jpeg"),
		//			DateOfDeparture = ((DateTime)t.LandingDateOfDeparture).ToString("dd.MM.yyyy"),
		//			DateOfReturn = ((DateTime)t.ArrivalDateOfReturn).ToString("dd.MM.yyyy"),
		//			StarsNumber = t.Tour.Hotel.StarsNumber,
		//			Price = t.Price,
		//		}));
		//	}
		//	catch (Exception ex)
		//	{
		//		return BadRequest(ex.Message);
		//	}
		//}

		[Authorize(Roles = "Manager, Admin")]
		[HttpGet("tours_for_editor")]
		public async Task<IActionResult> GetToursForEditor()
		{
			try
			{
				List<Tour> tours = await db.Tours
					.Include(t => t.TourType)
					.Include(t => t.Hotel)
					.ThenInclude(h => h.City)
					.ThenInclude(c => c.Country)
					.ToListAsync();

				return Ok(tours.Select(t => new TourForEditorCardDto
				{
					Id = t.Id,
					Name = t.Name,
					Country = t.Hotel.City.Country.Name,
					City = t.Hotel.City.Name,
					Hotel = t.Hotel.Name,
					TourTypeImageUrl = $"https://localhost:7276/{t.TourType.PathToImage}",
					StarsNumber = t.Hotel.StarsNumber,
					PhotoUrl = $"https://localhost:7276/uploads/tours/{t.Id}/0.jpg",
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Manager, Admin")]
		[HttpPost("add")]
		public async Task<IActionResult> AddTour([FromForm] TourForm tour)
		{
			try
			{
				if (tour.Id == 0)
				{
					using (var transaction = await db.Database.BeginTransactionAsync())
					{
						try
						{
							var characteristics = JsonConvert.DeserializeObject<List<CharacteristicForm>>(tour.Characteristics);
							var routes = JsonConvert.DeserializeObject<List<RouteForm>>(tour.Routes);

							List<int> characteristicIds = characteristics.Select(hc => hc.Id).ToList();
							ICollection<TourCharacteristic> tourCharacteristics = await db.TourCharacteristics
								   .Where(tc => characteristicIds.Contains(tc.Id))
								   .ToListAsync();

							Tour newTour = new Tour()
							{
								Name = tour.Name,
								MainDescription = tour.MainDescription,
								HotelId = tour.HotelId,
								TourTypeId = tour.TourTypeId,
								Characteristics = tourCharacteristics
							};

							await db.Tours.AddAsync(newTour);
							await db.SaveChangesAsync();

							var newRoutes = routes.Select(r => new Models.Entity.Route()
							{
								LandingDateOfDeparture = DateService.ConvertToDateFormat(r.LandingDateOfDeparture),
								LandingTimeOfDeparture = TimeSpan.ParseExact(
									r.LandingTimeOfDeparture,
									@"hh\:mm",
									CultureInfo.InvariantCulture
								),
								ArrivalDateOfDeparture = DateService.ConvertToDateFormat(r.ArrivalDateOfDeparture),
								ArrivalTimeOfDeparture = TimeSpan.ParseExact(
									r.ArrivalTimeOfDeparture,
									@"hh\:mm",
									CultureInfo.InvariantCulture
								),
								LandingDateOfReturn = DateService.ConvertToDateFormat(r.LandingDateOfReturn),
								LandingTimeOfReturn = TimeSpan.ParseExact(
									r.LandingTimeOfReturn,
									@"hh\:mm",
									CultureInfo.InvariantCulture
								),
								ArrivalDateOfReturn = DateService.ConvertToDateFormat(r.ArrivalDateOfReturn),
								ArrivalTimeOfReturn = TimeSpan.ParseExact(
									r.ArrivalTimeOfReturn,
									@"hh\:mm",
									CultureInfo.InvariantCulture
								),
								Price = r.Price,
								SeatsNumber = r.SeatsNumber,
								DepartmentDepartureId = r.DepartmentDepartureId,
								TourId = newTour.Id,
							});

							await db.Routes.AddRangeAsync(newRoutes);
							await db.SaveChangesAsync();

							if (tour.PhotosFiles?.Count > 0)
							{
								string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "tours", newTour.Id.ToString());
								if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

								for (int i = 0; i < tour.PhotosFiles.Count; i++)
								{
									var file = tour.PhotosFiles[i];
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

		//[Authorize(Roles = "Manager, Admin")]
		//[HttpPut("edit")]
		//public async Task<IActionResult> EditTour([FromForm] TourForm tour)
		//{
		//	try
		//	{
		//		if (tour.Id != 0)
		//		{
		//			using (var transaction = await db.Database.BeginTransactionAsync())
		//			{
		//				try
		//				{
		//					Tour editedTour = await db.Tours.FirstOrDefaultAsync(t => t.Id == tour.Id);

		//					if (editedTour == null) return NotFound();

		//					editedTour.Name = tour.Name;
		//					editedTour.MainDescription = tour.MainDescription;
		//					editedTour.HotelId = tour.HotelId;
		//					editedTour.NutritionTypeId = tour.NutritionTypeId;
		//					editedTour.TourTypeId = tour.TourTypeId;
		//					//if (tour.PhotoFile != null) editedTour.Photo = await PhotoService.ConvertToBytes(tour.PhotoFile);

		//					await db.SaveChangesAsync();

		//					List<Route> removedRoutes = await db.Routes.Where(r => r.TourId == editedTour.Id).ToListAsync();

		//					foreach (Route route in removedRoutes)
		//					{
		//						Booking removedBooking = await db.Bookings.FirstOrDefaultAsync(b => b.RouteId == route.Id);
		//						if (removedBooking != null) db.Bookings.Remove(removedBooking);
		//					}
		//					await db.SaveChangesAsync();

		//					db.Routes.RemoveRange(removedRoutes);
		//					await db.SaveChangesAsync();

		//					await db.Routes.AddRangeAsync(tour.Routes.Select(r => new Models.Entity.Route()
		//					{
		//						LandingDateOfDeparture = DateService.ConvertToDateFormat(r.LandingDateOfDeparture),
		//						LandingTimeOfDeparture = TimeSpan.ParseExact(
		//							r.LandingTimeOfDeparture,
		//							@"hh\:mm",
		//							CultureInfo.InvariantCulture
		//						),
		//						ArrivalDateOfDeparture = DateService.ConvertToDateFormat(r.ArrivalDateOfDeparture),
		//						ArrivalTimeOfDeparture = TimeSpan.ParseExact(
		//							r.ArrivalTimeOfDeparture,
		//							@"hh\:mm",
		//							CultureInfo.InvariantCulture
		//						),
		//						LandingDateOfReturn = DateService.ConvertToDateFormat(r.LandingDateOfReturn),
		//						LandingTimeOfReturn = TimeSpan.ParseExact(
		//							r.LandingTimeOfReturn,
		//							@"hh\:mm",
		//							CultureInfo.InvariantCulture
		//						),
		//						ArrivalDateOfReturn = DateService.ConvertToDateFormat(r.ArrivalDateOfReturn),
		//						ArrivalTimeOfReturn = TimeSpan.ParseExact(
		//							r.ArrivalTimeOfReturn,
		//							@"hh\:mm",
		//							CultureInfo.InvariantCulture
		//						),
		//						Price = r.Price,
		//						SeatsNumber = r.SeatsNumber,
		//						DepartmentDepartureId = r.DepartmentDeparture.Id,
		//						TransportTypeId = r.TransportType.Id,
		//						TourId = editedTour.Id,
		//					}));
		//					await db.SaveChangesAsync();

		//					//List<TourDescription> removedDescriptions = await db.Descriptions.Where(d => d.TourId == editedTour.Id).ToListAsync();
		//					//db.Descriptions.RemoveRange(removedDescriptions);
		//					//await db.SaveChangesAsync();

		//					//await db.Descriptions.AddRangeAsync(tour.Descriptions.Select(d => new TourDescription()
		//					//{
		//					//	CharacteristicId = d.Characteristic.Id,
		//					//	TourId = editedTour.Id,
		//					//	Value = d.Description.Value
		//					//}));
		//					//await db.SaveChangesAsync();

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
		[HttpDelete("delete")]
		public async Task<IActionResult> DeleteTour([FromQuery] int? tourId)
		{
			try
			{
				using (var transaction = await db.Database.BeginTransactionAsync())
				{
					try
					{
						List<Route> removedRoutes = await db.Routes.Where(r => r.TourId == tourId).ToListAsync();

						foreach (Route route in removedRoutes)
						{
							Booking removedBooking = await db.Bookings.FirstOrDefaultAsync(b => b.RouteId == route.Id);
							if (removedBooking != null) db.Bookings.Remove(removedBooking);
						}
						await db.SaveChangesAsync();

						db.Routes.RemoveRange(removedRoutes);
						await db.SaveChangesAsync();

						//List<TourDescription> removedDescriptions = await db.Descriptions.Where(d => d.TourId == tourId).ToListAsync();
						//db.Descriptions.RemoveRange(removedDescriptions);
						//await db.SaveChangesAsync();

						Tour removedTour = await db.Tours.FirstOrDefaultAsync(t => t.Id == tourId);
						if (removedTour == null) return NotFound();

						db.Tours.Remove(removedTour);
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
