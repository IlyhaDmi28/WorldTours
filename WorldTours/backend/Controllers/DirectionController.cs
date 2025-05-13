using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Models.Forms;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Diagnostics.Metrics;
using System.Reflection.PortableExecutable;

namespace backend.Controllers
{
	[Route("direction")]
	public class DirectionController : Controller
	{
		private AppDbContext db;

		public DirectionController(AppDbContext context)
		{
			db = context;
		}

		[HttpGet("regions")]
		public async Task<IActionResult> GetRegions()
		{
			try
			{
				List<Region> regions = await db.Regions.ToListAsync();

				return Ok(regions.Select(r => new GeographicObjectDto
				{
					Id = r.Id,
					Name = r.Name,
					ImageUrl = $"https://localhost:7276/{r.PathToImage}",
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("countries")]
		public async Task<IActionResult> GetCountries([FromQuery] int? regionId)
		{
			try
			{
				if (regionId == null || regionId == 0)
				{
                    List<Models.Entity.Country> countries = await db.Countries.ToListAsync();

					return Ok(countries.Select(c => new GeographicObjectDto
					{
						Id = c.Id,
						Name = c.Name,
						ImageUrl = $"https://localhost:7276/{c.PathToFlag}",
					}));
				}

                List<Models.Entity.Country> filteredCountries = await db.Countries
					.Where(c => c.RegionId == regionId)
					.ToListAsync();

				return Ok(filteredCountries.Select(c => new GeographicObjectDto
				{
					Id = c.Id,
					Name = c.Name,
					ImageUrl = $"https://localhost:7276/{c.PathToFlag}",
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("country_for_editor")]
		public async Task<IActionResult> GetCountryForEditor([FromQuery] int? countryId)
		{
			try
			{
				Country country = await db.Countries
						.Include(c => c.Cities)
						.ThenInclude(c => c.Landmarks)
						.FirstOrDefaultAsync(c => c.Id == countryId);

				if (country == null) return NotFound();

				CountryForEditorDto countryForEditor = new CountryForEditorDto()
				{
					Id = country.Id,
					Name = country.Name,
					FlagUrl = $"https://localhost:7276/{country.PathToFlag}",
					Lat = country.Lat,
					Lng = country.Lng,
					MainDescription = country.MainDescription,
					LevelOfDevelopment = country.LevelOfDevelopment,
					RegionId = country.RegionId,
					Cities = country.Cities.Select(c => new CityForEditorDto
					{
						Id = c.Id,
						Name = c.Name,
						Lat = c.Lat,
						Lng = c.Lng,
						ClimateId = c.ClimateId,
						MainDescription = c.MainDescription,
						Landmarks = c.Landmarks.Select(l => new LandmarkDto { Id = l.Id, Name = l.Name }).ToList()
					}).ToList()
				};

				return Ok(countryForEditor);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("country")]
		public async Task<IActionResult> GetCountry([FromQuery] int? countryId)
		{
			try
			{
				Country country = await db.Countries
						.Include(c => c.Region)
						.Include(c => c.Cities)
						.ThenInclude(c => c.Landmarks)
						.FirstOrDefaultAsync(c => c.Id == countryId);

				if (country == null) return NotFound();

				return Ok(new CountryDto()
				{
					Id = country.Id,
					Name = country.Name,
					FlagUrl = $"https://localhost:7276/{country.PathToFlag}",
					Lat = country.Lat,
					Lng = country.Lng,
					MainDescription = country.MainDescription,
					LevelOfDevelopment = country.LevelOfDevelopment,
					Region = country.Region.Name,
					Cities = country.Cities.Select(c => new CityForEditorDto
					{
						Id = c.Id,
						Name = c.Name,
						Lat = c.Lat,
						Lng = c.Lng,
						ClimateId = c.ClimateId,
						MainDescription = c.MainDescription,
						Landmarks = c.Landmarks.Select(l => new LandmarkDto { Id = l.Id, Name = l.Name }).ToList()
					}).ToList()
				});
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("city_for_editor")]
		public async Task<IActionResult> GetCityForEditor([FromQuery] int? cityId)
		{
			try
			{
				City city = await db.Cities.Include(c => c.Landmarks).FirstOrDefaultAsync(c => c.Id == cityId);

				if (city == null) return NotFound();

				CityForEditorDto cityForEditor = new CityForEditorDto()
				{
					Id = city.Id,
					Name = city.Name,
					Lat = city.Lat,
					Lng = city.Lng,
					ClimateId = city.ClimateId,
					MainDescription = city.MainDescription,
					Landmarks = city.Landmarks.Select(l => new LandmarkDto { Id = l.Id, Name = l.Name}).ToList()
				};

				return Ok(cityForEditor);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("climates")]
		public async Task<IActionResult> GetClimates()
		{
			try
			{
				List<Climate> climates = await db.Climates.ToListAsync();

				return Ok(climates.Select(c => new ClimateDto
				{
					Id = c.Id,
					Name = c.Name
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}



		[HttpGet("cities")]
		public async Task<IActionResult> GetCities([FromQuery] int? countryId)
		{
			try
			{
				List<City> cities = await db.Cities
					.Where(c => c.CountryId == countryId)
					.ToListAsync();

				return Ok(cities.Select(c => new CityDto {
					Id = c.Id,
					Name = c.Name 
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Manager, Admin")]
		[HttpPost("add_city")]
		public async Task<IActionResult> AddCity([FromForm] CityForm city)
		{
			try
			{
				if (city.Id == 0)
				{
					using (var transaction = await db.Database.BeginTransactionAsync())
					{						
						try
						{
							City newCity = new City()
							{
								Name = city.Name,
								MainDescription = city.MainDescription,
								Lng = (double)city.Lng,
								Lat = (double)city.Lat,
								ClimateId = city.ClimateId,
								CountryId = city.CountryId,
							};

							await db.Cities.AddAsync(newCity);
							await db.SaveChangesAsync();

							if (city.Landmarks != null && city.Landmarks.Count > 0)
							{
								var newLandmarks = city.Landmarks.Select(l => new Landmark()
								{
									Name = l.Name,
									CityId = newCity.Id,
								});
								await db.Landmarks.AddRangeAsync(newLandmarks);
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

				return BadRequest();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Manager, Admin")]
		[HttpPut("edit_city")]
		public async Task<IActionResult> EditCity([FromForm] CityForm city)
		{
			try
			{
				if (city.Id != 0)
				{
					using (var transaction = await db.Database.BeginTransactionAsync())
					{
						try
						{
							City editedCity = await db.Cities.FirstOrDefaultAsync(c => c.Id == city.Id);
							if (editedCity == null) return NotFound();

							editedCity.Name = city.Name;
							editedCity.MainDescription = city.MainDescription;
							editedCity.ClimateId = city.ClimateId;
							editedCity.Lat = (double)city.Lat;
							editedCity.Lng = (double)city.Lng;
							
							await db.SaveChangesAsync();

							var deletedLandmarks = await db.Landmarks.Where(l => l.CityId == city.Id).ToListAsync();

							db.Landmarks.RemoveRange(deletedLandmarks);
							await db.SaveChangesAsync();

							if(city.Landmarks != null && city.Landmarks.Count > 0)
							{
								var newLandmarks = city.Landmarks.Select(l => new Landmark()
								{
									Name = l.Name,
									CityId = city.Id,
								});
								await db.Landmarks.AddRangeAsync(newLandmarks);
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

				return BadRequest();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Manager, Admin")]
		[HttpPost("add_country")]
		public async Task<IActionResult> AddCountry([FromForm] CountryForm country)
		{
			try
			{
				if (country.Id == 0)
				{
					using (var transaction = await db.Database.BeginTransactionAsync())
					{
						try
						{
							List<CityForm> cities = null;

							try
							{
								cities = JsonConvert.DeserializeObject<List<CityForm>>(country.Cities);
							}
							catch { }

							

							Country newCountry = new Country()
							{
								Name = country.Name,
								MainDescription = country.MainDescription,
								Lng = (double)country.Lng,
								Lat = (double)country.Lat,
								RegionId = country.RegionId,
								LevelOfDevelopment = country.LevelOfDevelopment,
							};
							await db.Countries.AddAsync(newCountry);
							await db.SaveChangesAsync();

							if (country.PhotoFile != null)
							{
								string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "img", "flags");
								if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

								if (country.PhotoFile.Length > 0)
								{
									string filePath = Path.Combine(uploadsFolder, $"{newCountry.Id}.svg");
									using var fileStream = new FileStream(filePath, FileMode.Create);
									await country.PhotoFile.CopyToAsync(fileStream);
									newCountry.PathToFlag = $"/img/flags/{newCountry.Id}.svg";
								}
							}
							await db.SaveChangesAsync();

							var newCities = cities
								.Select(c => new City()
								{
									Name = c.Name,
									MainDescription = c.MainDescription,
									Lng = (double)c.Lng,
									Lat = (double)c.Lat,
									ClimateId = c.ClimateId,
									CountryId = newCountry.Id,
									Landmarks = c.Landmarks.Select(l => new Landmark
									{
										Name = l.Name
									}).ToList()
								}).ToList();

							await db.Cities.AddRangeAsync(newCities);
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
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Manager, Admin")]
		[HttpPut("edit_country")]
		public async Task<IActionResult> EditCountry([FromForm] CountryForm country)
		{
			try
			{
				if (country.Id != 0)
				{
					using (var transaction = await db.Database.BeginTransactionAsync())
					{
						try
						{
							Country editedCountry = await db.Countries.FirstOrDefaultAsync(c => c.Id == country.Id);
							if (editedCountry == null) return NotFound();

							editedCountry.Name = country.Name;
							editedCountry.MainDescription = country.MainDescription;
							editedCountry.RegionId = country.RegionId;
							editedCountry.Lat = (double)country.Lat;
							editedCountry.Lng = (double)country.Lng;
							editedCountry.LevelOfDevelopment = country.LevelOfDevelopment;

							if (country.PhotoFile != null)
							{
								string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "img", "flags");
								if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

								if (country.PhotoFile.Length > 0)
								{
									string filePath = Path.Combine(uploadsFolder, $"{country.Id}.svg");
									using var fileStream = new FileStream(filePath, FileMode.Create);
									await country.PhotoFile.CopyToAsync(fileStream);
									editedCountry.PathToFlag = $"/img/flags/{country.Id}.svg";
								}
							}

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
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Manager, Admin")]
		[HttpDelete("delete_city")]
		public async Task<IActionResult> DeleteCity([FromQuery] int? cityId)
		{
			try
			{
				using (var transaction = await db.Database.BeginTransactionAsync())
				{
					try
					{
						City deletedCity = await db.Cities.FirstOrDefaultAsync(t => t.Id == cityId);
						if (deletedCity == null) return NotFound();

						db.Cities.Remove(deletedCity);
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

		[Authorize(Roles = "Manager, Admin")]
		[HttpDelete("delete_country")]
		public async Task<IActionResult> DeleteCountry([FromQuery] int? countryId)
		{
			try
			{
				using (var transaction = await db.Database.BeginTransactionAsync())
				{
					try
					{
						Country deletedCountry = await db.Countries.FirstOrDefaultAsync(t => t.Id == countryId);
						if (deletedCountry == null) return NotFound();

						db.Countries.Remove(deletedCountry);
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

		[HttpGet("hotels")]
		public async Task<IActionResult> GetHotels([FromQuery] int? cityId)
		{
			try
			{
				List<Hotel> hotels = await db.Hotels
					.Where(h => h.CityId == cityId)
					.ToListAsync();

				return Ok(hotels.Select(h => new HotelDto 
				{
					Id = h.Id,
					Name = h.Name 
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("get")]
		public async Task<IActionResult> GetDirection([FromQuery] int? regionId, [FromQuery] int? countryId, [FromQuery] int? cityId, [FromQuery] int? hotelId)
		{
			try
			{
				if (hotelId != null && hotelId != 0)
				{
					Hotel hotel = await db.Hotels
						.Include(h => h.City)
						.ThenInclude(c => c.Country)
						.ThenInclude(c => c.Region)
						.FirstOrDefaultAsync(h => h.Id == hotelId);

					if (hotel == null) return NotFound();
					
					return Ok(new DirectionDto()
					{
						Region = hotel.City.Country.Region.Name,
						Country = hotel.City.Country.Name,
						City = hotel.City.Name,
						Hotel = hotel.Name,
						StarsNumber = hotel.StarsNumber
					});
				}
				else if (cityId != null && cityId != 0)
				{
					City city = await db.Cities
						.Include(c => c.Country)
						.ThenInclude(c => c.Region)
						.FirstOrDefaultAsync(c => c.Id == cityId);

					if (city == null) return NotFound();

					return Ok(new DirectionDto()
					{
						Region = city.Country.Region.Name,
						Country = city.Country.Name,
						City = city.Name,
					});
				}
				else if (countryId != null && countryId != 0)
				{
                    Models.Entity.Country country = await db.Countries
						.Include(c => c.Region)
						.FirstOrDefaultAsync(c => c.Id == countryId);

					if (country == null) return NotFound();

					return Ok(new DirectionDto()
					{
						Region = country.Region.Name,
						Country = country.Name,
					});
				}
				else if (regionId != null && regionId != 0)
				{
					Region region = await db.Regions.FirstOrDefaultAsync(r => r.Id == regionId);

					if (region == null) return NotFound();
					return Ok(new DirectionDto() { Region = region.Name });
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
