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
			var regions = await db.Regions
				.Select(region => new RegionDto
				{
					Id = region.Id,
					Name = region.Name,
					ImageUrl = PhotoService.ConvertToBase64(region.Image, "jpeg"),
				})
				.ToListAsync();

			return Ok(regions);
		}

		[HttpGet("countries")]
		public async Task<IActionResult> GetCountries([FromQuery] int? regionId)
		{
			if (regionId == null || regionId == 0)
			{
				var countries = await db.Countries
					.Select(country => new CountryDto
					{
						Id = country.Id,
						Name = country.Name,
						FlagUrl = PhotoService.ConvertToBase64(country.Flag, "svg+xml"),
					})
					.ToListAsync();

				return Ok(countries);
			}

			var filteredCountries = await db.Countries
				.Where(country => country.RegionId == regionId)
				.Select(country => new CountryDto
				{
					Id = country.Id,
					Name = country.Name,
					FlagUrl = PhotoService.ConvertToBase64(country.Flag, "svg+xml"),
				})
				.ToListAsync();

			return Ok(filteredCountries);
		}

		[HttpGet("cities")]
		public async Task<IActionResult> GetCities([FromQuery] int countryId)
		{
			var cities = await db.Cities
				.Where(city => city.CountryId == countryId)
				.Select(city => new CityDto { Id = city.Id, Name = city.Name })
				.ToListAsync();

			return Ok(cities);
		}

		[HttpGet("hotels")]
		public async Task<IActionResult> GetHotels([FromQuery] int cityId)
		{
			var hotels = await db.Hotels
				.Where(hotel => hotel.CityId == cityId)
				.Select(hotel => new HotelDto { Id = hotel.Id, Name = hotel.Name })
				.ToListAsync();

			return Ok(hotels);
		}

		[HttpGet("get")]
		public async Task<IActionResult> GetDirection([FromQuery] int? regionId, [FromQuery] int? countryId, [FromQuery] int? cityId, [FromQuery] int? hotelId)
		{
			if (hotelId != null && hotelId != 0)
			{
				var hotel = await db.Hotels
					.Include(h => h.City)
						.ThenInclude(c => c.Country)
							.ThenInclude(c => c.Region)
					.FirstOrDefaultAsync(h => h.Id == hotelId);

				if (hotel != null)
				{
					return Ok(new DirectionDto()
					{
						Region = hotel.City.Country.Region.Name,
						Country = hotel.City.Country.Name,
						City = hotel.City.Name,
						Hotel = hotel.Name,
						StarsNumber = hotel.StarsNumber
					});
				}
			}
			else if (cityId != null && cityId != 0)
			{
				var city = await db.Cities
					.Include(c => c.Country)
						.ThenInclude(c => c.Region)
					.FirstOrDefaultAsync(c => c.Id == cityId);

				if (city != null)
				{
					return Ok(new DirectionDto()
					{
						Region = city.Country.Region.Name,
						Country = city.Country.Name,
						City = city.Name,
					});
				}
			}
			else if (countryId != null && countryId != 0)
			{
				var country = await db.Countries
					.Include(c => c.Region)
					.FirstOrDefaultAsync(c => c.Id == countryId);

				if (country != null)
				{
					return Ok(new DirectionDto()
					{
						Region = country.Region.Name,
						Country = country.Name,
					});
				}
			}
			else if (regionId != null && regionId != 0)
			{
				var region = await db.Regions
					.FirstOrDefaultAsync(r => r.Id == regionId);

				if (region != null)
				{
					return Ok(new DirectionDto()
					{
						Region = region.Name,
					});
				}
			}

			return BadRequest();
		}
	}
}
