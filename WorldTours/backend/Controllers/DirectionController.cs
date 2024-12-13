using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
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
		public IActionResult GetRegions()
		{
			return Ok(db.Regions.Select(region => new RegionDto { Id = region.Id, Name = region.Name, ImageUrl = $"{"data:image/jpeg;base64,"}{Convert.ToBase64String(region.Image)}" }));
		}

		[HttpGet("countries")]
		public IActionResult GetCountries([FromQuery] int? regionId)
		{
			if (regionId == null || regionId == 0) return Ok(db.Countries.Select(country => new CountryDto { Id = country.Id, Name = country.Name, FlagUrl = $"{"data:image/svg+xml;base64,"}{Convert.ToBase64String(country.Flag)}" }));
			
			return Ok(db.Countries.Where(county => county.RegionId == regionId).Select(country => new CountryDto { Id = country.Id, Name = country.Name, FlagUrl = $"{"data:image/svg+xml;base64,"}{Convert.ToBase64String(country.Flag)}"}));
		}

		[HttpGet("cities")]
		public IActionResult GetCities([FromQuery] int countryId)
		{
			return Ok(db.Cities.Where(city => city.CountryId == countryId).Select(city => new CityDto { Id = city.Id, Name = city.Name }));
		}

		[HttpGet("hotels")]
		public IActionResult GetHotels([FromQuery] int cityId)
		{
			return Ok(db.Hotels.Where(hotel => hotel.CityId == cityId).Select(hotel => new HotelDto { Id = hotel.Id, Name = hotel.Name }));
		}

		[HttpGet("get")]
		public IActionResult GetDirection([FromQuery] int? regionId, [FromQuery] int? countryId, [FromQuery] int? cityId, [FromQuery] int? hotelId)
		{
			if (hotelId != null && hotelId != 0)
			{
				Hotel hotel = db.Hotels.Include(h => h.City).ThenInclude(c => c.Country).ThenInclude(c => c.Region).FirstOrDefault(hotel => hotel.Id == hotelId);

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
				City city = db.Cities.Include(c => c.Country).ThenInclude(c => c.Region).FirstOrDefault(city => city.Id == cityId);

				return Ok(new DirectionDto()
				{
					Region = city.Country.Region.Name,
					Country = city.Country.Name,
					City = city.Name,
				});
			}
			else if (countryId != null && countryId != 0)
			{
				Country country = db.Countries.Include(c => c.Region).FirstOrDefault(country => country.Id == countryId);

				return Ok(new DirectionDto()
				{
					Region = country.Region.Name,
					Country = country.Name,
				});
			}
			else if (regionId != null && regionId != 0)
			{
				Region region = db.Regions.FirstOrDefault(region => region.Id == regionId);

				return Ok(new DirectionDto()
				{
					Region = region.Name,
				});
			}

			return BadRequest();

		}
	}
}
