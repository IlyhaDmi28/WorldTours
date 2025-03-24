using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

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
