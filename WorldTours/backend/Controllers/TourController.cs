﻿using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Models.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
			var tourTypes = await db.TourTypes
				.Select(tt => new TourTypeDto
				{
					Id = tt.Id,
					Name = tt.Name,
					ImageUrl = tt.Image == null ? "" : $"data:image/svg+xml;base64,{Convert.ToBase64String(tt.Image)}"
				})
				.ToListAsync();

			return Ok(tourTypes);
		}

		[HttpGet("characteristics")]
		public async Task<IActionResult> GetCharacteristics([FromQuery] int id)
		{
			var characteristics = await db.Characteristics
				.Include(c => c.TourTypes)
				.Where(c => c.TourTypes.Any(tt => tt.Id == id))
				.Select(c => new DescriptionWithCharacteriscDto
				{
					Characteristic = new CharacteristicDto() { Id = c.Id, Name = c.Name },
					Description = new DescriptionDto() { Id = 0, Value = false },
				})
				.ToListAsync(); 

			return Ok(characteristics);
		}

		[HttpGet("characteristics_to_filter")]
		public async Task<IActionResult> GetCharacteristicsToFilter([FromQuery] int id)
		{
			var characteristics = await db.Characteristics
				.Include(c => c.TourTypes)
				.Where(c => c.TourTypes.Any(tt => tt.Id == id))
				.Select(c => new DescriptionForFilterDto
				{
					CharacteristicId = c.Id,
					CharacteristicName = c.Name,
					Value = 0
				})
				.ToListAsync(); 

			return Ok(characteristics);
		}

		[HttpGet("nutrition_types")]
		public async Task<IActionResult> GetNutritionTypes()
		{
			var nutritionTypes = await db.NutritionTypes
				.Select(nutritionType => new NutritionTypeDto
				{
					Id = nutritionType.Id,
					Name = nutritionType.Name,
				})
				.OrderBy(nutritionType => nutritionType.Id)
				.ToListAsync();

			return Ok(nutritionTypes);
		}

		[HttpGet("tour_to_edit")]
		public async Task<IActionResult> GetTourToEdit([FromQuery] int? id = null)
		{
			TourForEditorDto tourEdit;
			if (id == 0)
			{
				tourEdit = new TourForEditorDto()
				{
					Id = 0,
					Name = "",
					MainDescription = string.Empty,
					HotelId = null,
					NutritionTypeId = 1,
					TourTypeId = 1,
					PhotoUrl = null,
					Routes = new List<RouteDto>(),
					Descriptions = new List<DescriptionWithCharacteriscDto>(),
				};
			}
			else
			{
				// Загрузка данных для тура асинхронно
				var tour = await db.Tours
					.Include(t => t.Routes)
					.Include(t => t.Descriptions)
						.ThenInclude(d => d.Characteristic)
					.FirstOrDefaultAsync(t => t.Id == id);

				if (tour == null)
				{
					return NotFound(); // Возвращаем 404, если тур не найден
				}

				var routes = await db.Routes
					.Include(r => r.TransportType)
					.Include(r => r.DepartmentDeparture)
						.ThenInclude(d => d.City)
						.ThenInclude(c => c.Country)
					.Where(r => r.TourId == id)
					.ToListAsync();

				var descriptions = await db.Descriptions
					.Include(d => d.Characteristic)
						.ThenInclude(c => c.CharacteristicType)
					.Where(d => d.TourId == id)
					.ToListAsync();

				tourEdit = new TourForEditorDto()
				{
					Id = tour.Id,
					Name = tour.Name,
					MainDescription = tour.MainDescription,
					HotelId = tour.HotelId,
					NutritionTypeId = tour.NutritionTypeId,
					TourTypeId = tour.TourTypeId,
					PhotoUrl = tour.Photo == null ? "" : $"data:image/jpeg;base64,{Convert.ToBase64String(tour.Photo)}",
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
							Id = r.TransportType?.Id ?? 0,
							Name = r.TransportType?.Name
						},
						DepartmentDeparture = new DepartmentDepartureDto
						{
							Id = r.DepartmentDeparture?.Id ?? 0,
							Name = r.DepartmentDeparture?.Name,
							City = r.DepartmentDeparture?.City?.Name,
							Country = r.DepartmentDeparture?.City?.Country?.Name
						}
					}).ToList(),
					Descriptions = descriptions.Select(d => new DescriptionWithCharacteriscDto()
					{
						Characteristic = new CharacteristicDto
						{
							Id = d.Characteristic.Id,
							Name = d.Characteristic.Name
						},
						Description = new DescriptionDto
						{
							Id = d.Id,
							Value = d.Value
						}
					}).ToList(),
				};
			}

			return Ok(tourEdit);
		}

		[HttpGet("get")]
		public async Task<IActionResult> GetTour([FromQuery] int? id = null)
		{
			// Загрузка основной информации о туре
			var tourBase = await db.Tours
				.Include(t => t.TourType)
				.Include(t => t.NutritionType)
				.Include(t => t.Hotel)
					.ThenInclude(h => h.City)
					.ThenInclude(c => c.Country)
				.FirstOrDefaultAsync(t => t.Id == id);

			if (tourBase == null)
				return NotFound(); // Возвращаем 404, если тур не найден

			// Загрузка маршрутов для тура
			var routes = await db.Routes
				.Include(r => r.TransportType)
				.Include(r => r.DepartmentDeparture)
					.ThenInclude(d => d.City)
					.ThenInclude(c => c.Country)
				.Where(r => r.TourId == id)
				.ToListAsync();

			// Загрузка описаний для тура
			var descriptions = await db.Descriptions
				.Include(d => d.Characteristic)
					.ThenInclude(c => c.CharacteristicType)
				.Where(d => d.TourId == id && d.Value)
				.ToListAsync();

			// Преобразование в DTO
			var tour = new TourDto
			{
				Id = tourBase.Id,
				Name = tourBase.Name,
				PhotoUrl = tourBase.Photo == null ? "" : $"data:image/png;base64,{Convert.ToBase64String(tourBase.Photo)}",
				MainDescription = tourBase.MainDescription,
				NutritionType = tourBase.NutritionType?.Name,
				Direction = new DirectionDto
				{
					Country = tourBase.Hotel.City.Country?.Name,
					City = tourBase.Hotel.City?.Name,
					Hotel = tourBase.Hotel?.Name,
					StarsNumber = tourBase.Hotel?.StarsNumber ?? 0
				},
				Routes = routes.Select(r => new RouteDto
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
						Id = r.TransportType?.Id ?? 0,
						Name = r.TransportType?.Name
					},
					DepartmentDeparture = new DepartmentDepartureDto
					{
						Id = r.DepartmentDeparture?.Id ?? 0,
						Name = r.DepartmentDeparture?.Name,
						City = r.DepartmentDeparture?.City?.Name,
						Country = r.DepartmentDeparture?.City?.Country?.Name
					}
				}).ToList(),
				Descriptions = descriptions
					.GroupBy(d => d.Characteristic.CharacteristicType)
					.Select(g => new CharacteristicTypeWithDescriptions
					{
						Id = g.Key?.Id ?? 0,
						Name = g.Key?.Name,
						Descriptions = g.Select(d => new DescriptionWithCharacteriscDto
						{
							Characteristic = new CharacteristicDto
							{
								Id = d.Characteristic?.Id ?? 0,
								Name = d.Characteristic?.Name
							},
							Description = new DescriptionDto
							{
								Id = d.Id,
								Value = d.Value
							}
						}).ToList()
					}).ToList()
			};

			return Ok(tour);
		}


		[HttpGet("tours")]
		public async Task<IActionResult> GetTours()
		{

			var routes = db.Routes
			.Include(r => r.Tour)
			.ThenInclude(t => t.Hotel) // Загружаем связанные отели
			.ThenInclude(h => h.City) // Загружаем города отелей
			.ThenInclude(c => c.Country) // Загружаем страны городов
			.ToList();

			return Ok(routes.Select(t => new TourCardDto
			{
				Id = t.Tour.Id,
				RouteId = t.Id,
				Name = t.Tour.Name,
				Country = t.Tour.Hotel.City.Country.Name,
				City = t.Tour.Hotel.City.Name,
				PhotoUrl = t.Tour.Photo == null ? "" : $"{"data:image/jpeg;base64,"}{Convert.ToBase64String(t.Tour.Photo)}",
				DateOfDeparture = ((DateTime)t.LandingDateOfDeparture).ToString("dd.MM.yyyy"),
				DateOfReturn = ((DateTime)t.ArrivalDateOfReturn).ToString("dd.MM.yyyy"),
				StarsNumber = t.Tour.Hotel.StarsNumber,
				Price = t.Price,
			}));
		}

		[HttpPost("filtred_tours")]
		public async Task<IActionResult> GetFiltredTours([FromBody] Filter filter)
		{
			var tours = db.Tours
			.Include(t => t.Descriptions);

			var routes = await db.Routes
			.Include(r => r.DepartmentDeparture)
			.Include(r => r.Tour)
			.ThenInclude(t => t.Hotel) // Загружаем связанные отели
			.ThenInclude(h => h.City) // Загружаем города отелей
			.ThenInclude(c => c.Country) // Загружаем страны городов
			.ToListAsync();

			foreach (Tour tour in tours)
			{
				foreach (Route route in routes)
				{
					if (route.TourId == tour.Id) route.Tour = tour;
				}
			}


			List<Route> filtredRoutes = new List<Route>();
			if (filter != null)
			{
				if (filter.CityId != 0 && filter.CityId != null) routes = routes.Where(t => t.Tour.Hotel.CityId == filter.CityId).ToList();
				if (filter.CountryId != 0 && filter.CountryId != null) routes = routes.Where(t => t.Tour.Hotel.City.CountryId == filter.CountryId).ToList();
				if (filter.DepartureCityId != 0 && filter.DepartureCityId != null) routes = routes.Where(t => t.DepartmentDeparture.CityId == filter.DepartureCityId).ToList();
				if (filter.DateOfDeparture != null && filter.DateOfDeparture != "") routes = routes.Where(t => t.LandingDateOfDeparture >= DateTime.Parse(filter.DateOfDeparture)).ToList();
				if (filter.DateOfReturn != null && filter.DateOfReturn != "") routes = routes.Where(t => t.ArrivalDateOfReturn <= DateTime.Parse(filter.DateOfReturn)).ToList();
				if (filter.TransportTypeId != 0 && filter.TransportTypeId != null) routes = routes.Where(t => t.TransportTypeId == filter.TransportTypeId).ToList();
				if (filter.TourTypeId != 0 && filter.TourTypeId != null) routes = routes.Where(t => t.Tour.TourTypeId == filter.TourTypeId).ToList();
				if (filter.MinPrice != 0 && filter.MinPrice != null) routes = routes.Where(t => t.Price >= filter.MinPrice).ToList();
				if (filter.MaxPrice != 0 && filter.MaxPrice != null) routes = routes.Where(t => t.Price <= filter.MaxPrice).ToList();
				if (filter.MinHotelStars != 0 && filter.MinHotelStars != null) routes = routes.Where(t => t.Tour.Hotel.StarsNumber >= filter.MinHotelStars).ToList();
				if (filter.MaxHotelStars != 0 && filter.MaxHotelStars != null) routes = routes.Where(t => t.Tour.Hotel.StarsNumber <= filter.MaxHotelStars).ToList();
				if (filter.NutritionTypeId != 0 && filter.NutritionTypeId != null) routes = routes.Where(t => t.Tour.NutritionTypeId == filter.NutritionTypeId).ToList();

				filtredRoutes = routes.ToList();
				if (filter.Descriptions != null)
				{
					foreach (Route route in routes)
					{
						foreach (Description description in route.Tour.Descriptions)
						{
							foreach (DescriptionForFilterDto descriptionForFilter in filter.Descriptions)
							{
								switch ((int)descriptionForFilter.Value)
								{
									case 0:
										{
											continue;
										}
									case 1:
										{
											if (descriptionForFilter.CharacteristicId == description.CharacteristicId && !description.Value) filtredRoutes.Remove(route);
											break;
										}
									case 2:
										{
											if (descriptionForFilter.CharacteristicId == description.CharacteristicId && description.Value) filtredRoutes.Remove(route);
											break;
										}
									default:
										{
											continue;
										}
								}
							}
						}
					}
				}
			}

			return Ok(filtredRoutes.Select(t => new TourCardDto
			{
				Id = t.Tour.Id,
				RouteId = t.Id,
				Name = t.Tour.Name,
				Country = t.Tour.Hotel.City.Country.Name,
				City = t.Tour.Hotel.City.Name,
				PhotoUrl = t.Tour.Photo == null ? "" : $"{"data:image/jpeg;base64,"}{Convert.ToBase64String(t.Tour.Photo)}",
				DateOfDeparture = ((DateTime)t.LandingDateOfDeparture).ToString("dd.MM.yyyy"),
				DateOfReturn = ((DateTime)t.ArrivalDateOfReturn).ToString("dd.MM.yyyy"),
				StarsNumber = t.Tour.Hotel.StarsNumber,
				Price = t.Price,
			}));
		}

		[HttpGet("tours_to_edit")]
		public async Task<IActionResult> GetToursToEdit([FromQuery] int? tourTypeId)
		{
			if(tourTypeId == null || tourTypeId == 0)
			{
				var tours = await db.Tours
				.Include(t => t.Hotel) // Загружаем связанные отели
				.ThenInclude(h => h.City) // Загружаем города отелей
				.ThenInclude(c => c.Country) // Загружаем страны городов
				.Select(t => new TourCardForEditor
				{
					Id = t.Id,
					Name = t.Name,
					Country = t.Hotel.City.Country.Name,
					City = t.Hotel.City.Name,
					PhotoUrl = t.Photo == null ? "" : $"data:image/jpeg;base64,{Convert.ToBase64String(t.Photo)}",
					StarsNumber = t.Hotel.StarsNumber,
				})
				.ToListAsync();

				return Ok(tours);
			}
			else
			{
				var tours = await db.Tours
				.Include(t => t.Hotel) // Загружаем связанные отели
				.ThenInclude(h => h.City) // Загружаем города отелей
				.ThenInclude(c => c.Country) // Загружаем страны городов
				.Where(t => t.TourTypeId == tourTypeId)
				.Select(t => new TourCardForEditor
				{
					Id = t.Id,
					Name = t.Name,
					Country = t.Hotel.City.Country.Name,
					City = t.Hotel.City.Name,
					PhotoUrl = t.Photo == null ? "" : $"data:image/jpeg;base64,{Convert.ToBase64String(t.Photo)}",
					StarsNumber = t.Hotel.StarsNumber,
				})
				.ToListAsync();

				return Ok(tours);
			}
		}


		[HttpPost("add")]
		public async Task<IActionResult> AddTour([FromForm] TourForEditorDto tour)
		{
			if (tour.Id == 0)
			{
				using (var transaction = await db.Database.BeginTransactionAsync())
				{
					try
					{
						Tour newTour = new Tour()
						{
							Name = tour.Name,
							MainDescription = tour.MainDescription,
							HotelId = tour.HotelId,
							NutritionTypeId = tour.NutritionTypeId,
							TourTypeId = tour.TourTypeId,
						};

						if (tour.PhotoFile != null)
						{
							using (var memoryStream = new MemoryStream())
							{
								await tour.PhotoFile.CopyToAsync(memoryStream);
								newTour.Photo = memoryStream.ToArray();
							}
						}

						await db.Tours.AddAsync(newTour);
						await db.SaveChangesAsync();

						await db.Routes.AddRangeAsync(tour.Routes.Select(route => new Models.Entity.Route()
						{
							LandingDateOfDeparture = DateTime.Parse(route.LandingDateOfDeparture),
							LandingTimeOfDeparture = TimeSpan.Parse(route.LandingTimeOfDeparture),
							ArrivalDateOfDeparture = DateTime.Parse(route.ArrivalDateOfDeparture),
							ArrivalTimeOfDeparture = TimeSpan.Parse(route.ArrivalTimeOfDeparture),
							LandingDateOfReturn = DateTime.Parse(route.LandingDateOfReturn),
							LandingTimeOfReturn = TimeSpan.Parse(route.LandingTimeOfReturn),
							ArrivalDateOfReturn = DateTime.Parse(route.ArrivalDateOfReturn),
							ArrivalTimeOfReturn = TimeSpan.Parse(route.ArrivalTimeOfReturn),
							Price = route.Price,
							SeatsNumber = route.SeatsNumber,
							DepartmentDepartureId = route.DepartmentDeparture.Id,
							TransportTypeId = route.TransportType.Id,
							TourId = newTour.Id,
						}));
						await db.SaveChangesAsync();

						await db.Descriptions.AddRangeAsync(tour.Descriptions.Select(description => new Description()
						{
							CharacteristicId = description.Characteristic.Id,
							TourId = newTour.Id,
							Value = description.Description.Value
						}));
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

			return BadRequest();
		}


		[HttpPut("edit")]
		public async Task<IActionResult> EditTour([FromForm] TourForEditorDto tour)
		{
			if (tour.Id != 0)
			{
				using (var transaction = await db.Database.BeginTransactionAsync())
				{
					try
					{
						Tour editedTour = await db.Tours.FirstOrDefaultAsync(t => t.Id == tour.Id);

						if (editedTour == null)
						{
							return NotFound();
						}

						// Обновление свойств тура
						editedTour.Name = tour.Name;
						editedTour.MainDescription = tour.MainDescription;
						editedTour.HotelId = tour.HotelId;
						editedTour.NutritionTypeId = tour.NutritionTypeId;
						editedTour.TourTypeId = tour.TourTypeId;

						// Обновление фотографии
						if (tour.PhotoFile != null)
						{
							using (var memoryStream = new MemoryStream())
							{
								await tour.PhotoFile.CopyToAsync(memoryStream);
								editedTour.Photo = memoryStream.ToArray();
							}
						}

						await db.SaveChangesAsync();

						// Обновление маршрутов
						List<Route> removedRoutes = await db.Routes.Where(r => r.TourId == editedTour.Id).ToListAsync();

						foreach (Route route in removedRoutes)
						{
							Booking removedBooking = await db.Bookings.FirstOrDefaultAsync(b => b.RouteId == route.Id);
							if (removedBooking != null) db.Bookings.Remove(removedBooking);
						}
						await db.SaveChangesAsync();


						db.Routes.RemoveRange(removedRoutes);
						await db.SaveChangesAsync();

						await db.Routes.AddRangeAsync(tour.Routes.Select(route => new Models.Entity.Route()
						{
							LandingDateOfDeparture = DateTime.Parse(route.LandingDateOfDeparture),
							LandingTimeOfDeparture = TimeSpan.Parse(route.LandingTimeOfDeparture),
							ArrivalDateOfDeparture = DateTime.Parse(route.ArrivalDateOfDeparture),
							ArrivalTimeOfDeparture = TimeSpan.Parse(route.ArrivalTimeOfDeparture),
							LandingDateOfReturn = DateTime.Parse(route.LandingDateOfReturn),
							LandingTimeOfReturn = TimeSpan.Parse(route.LandingTimeOfReturn),
							ArrivalDateOfReturn = DateTime.Parse(route.ArrivalDateOfReturn),
							ArrivalTimeOfReturn = TimeSpan.Parse(route.ArrivalTimeOfReturn),
							Price = route.Price,
							SeatsNumber = route.SeatsNumber,
							DepartmentDepartureId = route.DepartmentDeparture.Id,
							TransportTypeId = route.TransportType.Id,
							TourId = editedTour.Id,
						}));
						await db.SaveChangesAsync();

						// Обновление описаний
						List<Description> removedDescriptions = await db.Descriptions.Where(d => d.TourId == editedTour.Id).ToListAsync();
						db.Descriptions.RemoveRange(removedDescriptions);
						await db.SaveChangesAsync();

						await db.Descriptions.AddRangeAsync(tour.Descriptions.Select(description => new Description()
						{
							CharacteristicId = description.Characteristic.Id,
							TourId = editedTour.Id,
							Value = description.Description.Value
						}));
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

			return BadRequest();
		}

		[HttpDelete("delete")]
		public async Task<IActionResult> DeleteTour([FromQuery] int id)
		{
			using (var transaction = await db.Database.BeginTransactionAsync())
			{
				try
				{
					// Удаление маршрутов
					List<Route> removedRoutes = await db.Routes.Where(r => r.TourId == id).ToListAsync();

					foreach (Route route in removedRoutes)
					{
						Booking removedBooking = await db.Bookings.FirstOrDefaultAsync(b => b.RouteId == route.Id);
						if (removedBooking != null) db.Bookings.Remove(removedBooking);
					}
					await db.SaveChangesAsync();

					db.Routes.RemoveRange(removedRoutes);
					await db.SaveChangesAsync();

					// Удаление описаний
					List<Description> removedDescriptions = await db.Descriptions.Where(d => d.TourId == id).ToListAsync();
					db.Descriptions.RemoveRange(removedDescriptions);
					await db.SaveChangesAsync();

					// Удаление тура
					Tour removedTour = await db.Tours.FirstOrDefaultAsync(t => t.Id == id);
					if (removedTour != null)
					{
						db.Tours.Remove(removedTour);
						await db.SaveChangesAsync();
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
	}
}
