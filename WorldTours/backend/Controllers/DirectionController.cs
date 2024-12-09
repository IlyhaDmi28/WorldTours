using backend.DB;
using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace backend.Controllers
{
	public class DirectionController : Controller
	{
		private AppDbContext db;

		public DirectionController(AppDbContext context)
		{
			db = context;
		}
		public IActionResult Regions()
		{
			return Ok(db.Regions.Select(region => new RegionDto { Id = region.Id, Name = region.Name, ImageUrl = $"{"data:image/jpeg;base64,"}{Convert.ToBase64String(region.Image)}" }));
		}

		public IActionResult Countries([FromQuery] int? regionId)
		{
			if (regionId == null || regionId == 0) return Ok(db.Countries.Select(country => new CountryDto { Id = country.Id, Name = country.Name, FlagUrl = $"{"data:image/svg+xml;base64,"}{Convert.ToBase64String(country.Flag)}" }));
			
			return Ok(db.Countries.Where(county => county.RegionId == regionId).Select(country => new CountryDto { Id = country.Id, Name = country.Name, FlagUrl = $"{"data:image/svg+xml;base64,"}{Convert.ToBase64String(country.Flag)}"}));
		}
		public IActionResult Cities([FromQuery] int countryId)
		{
			return Ok(db.Cities.Where(city => city.CountryId == countryId).Select(city => new CityDto { Id = city.Id, Name = city.Name }));
		}

		public IActionResult Hotels([FromQuery] int cityId)
		{
			return Ok(db.Hotels.Where(hotel => hotel.CityId == cityId).Select(hotel => new HotelDto { Id = hotel.Id, Name = hotel.Name }));
		}

		public IActionResult Direction([FromQuery] int? countryId, [FromQuery] int? cityId, [FromQuery] int hotelId)
	{
			if (countryId != null && cityId != null)
			{
				string countryName = db.Countries.FirstOrDefault(country => country.Id == countryId).Name;
				string cityName = db.Cities.FirstOrDefault(city => city.Id == cityId).Name;
				string hotelName = db.Hotels.FirstOrDefault(hotel => hotel.Id == hotelId).Name;
				int starsNumber = db.Hotels.FirstOrDefault(hotel => hotel.Id == hotelId).StarsNumber;

				return Ok(new DirectionDto() { Country = countryName, City = cityName, Hotel = hotelName, StarsNumber = starsNumber });
			}
			else
			{
				Hotel hotel = db.Hotels.FirstOrDefault(hotel => hotel.Id == hotelId);
				string hotelName = hotel.Name;
				int starsNumber = hotel.StarsNumber;

				City city = db.Cities.FirstOrDefault(city => city.Id == hotel.CityId);
				string cityName = hotel.City.Name;

				Country country = db.Countries.FirstOrDefault(country => country.Id == city.CountryId);
				string countryName = hotel.City.Country.Name;

				return Ok(new DirectionDto() { Country = countryName, City = cityName, Hotel = hotelName, StarsNumber = starsNumber });
			}
		}
	}
}
