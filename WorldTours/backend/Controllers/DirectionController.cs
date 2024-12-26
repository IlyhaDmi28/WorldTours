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
			List<Region> regions = await db.Regions.ToListAsync();

			return Ok(regions.Select(region => new RegionDto
			{
				Id = region.Id,
				Name = region.Name,
				ImageUrl = PhotoService.ConvertToBase64(region.Image, "jpeg"),
			}));
		}

		[HttpGet("countries")]
		public async Task<IActionResult> GetCountries([FromQuery] int? regionId)
		{
			if (regionId == null || regionId == 0)
			{
				List<Country> countries = await db.Countries.ToListAsync();

				return Ok(countries.Select(country => new CountryDto
				{
					Id = country.Id,
					Name = country.Name,
					FlagUrl = PhotoService.ConvertToBase64(country.Flag, "svg+xml"),
				}));
			}

			List<Country> filteredCountries = await db.Countries
				.Where(country => country.RegionId == regionId)
				.ToListAsync();

			return Ok(filteredCountries.Select(country => new CountryDto
			{
				Id = country.Id,
				Name = country.Name,
				FlagUrl = PhotoService.ConvertToBase64(country.Flag, "svg+xml"),
			}));
		}

		[HttpGet("cities")]
		public async Task<IActionResult> GetCities([FromQuery] int? countryId)
		{
			List<City> cities = await db.Cities
				.Where(city => city.CountryId == countryId)
				.ToListAsync();

			return Ok(cities.Select(city => new CityDto {
				Id = city.Id,
				Name = city.Name 
			}));
		}

		[HttpGet("hotels")]
		public async Task<IActionResult> GetHotels([FromQuery] int? cityId)
		{
			List<Hotel> hotels = await db.Hotels
				.Where(hotel => hotel.CityId == cityId)
				.ToListAsync();

			return Ok(hotels.Select(hotel => new HotelDto 
			{
				Id = hotel.Id,
				Name = hotel.Name 
			}));
		}

		[HttpGet("get")]
		public async Task<IActionResult> GetDirection([FromQuery] int? regionId, [FromQuery] int? countryId, [FromQuery] int? cityId, [FromQuery] int? hotelId)
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
				Country country = await db.Countries
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
	}
}
