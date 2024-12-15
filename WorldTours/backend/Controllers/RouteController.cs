using backend.DB;
using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
	[Route("route")]
	public class RouteController : Controller
	{
		private AppDbContext db;
		public RouteController(AppDbContext context)
		{
			db = context;
		}

		[HttpGet("department_departures")]
		public async Task<IActionResult> GetDepartmentDepartures()
		{
			var departmentDepartures = await db.DepartmentDepartures
				.Include(departmentDeparture => departmentDeparture.City)
				.ThenInclude(city => city.Country)
				.Select(departmentDeparture => new DepartmentDepartureDto
				{
					Id = departmentDeparture.Id,
					Name = departmentDeparture.Name,
					City = departmentDeparture.City.Name,
					Country = departmentDeparture.City.Country.Name
				})
				.OrderBy(departmentDeparture => departmentDeparture.Id)
				.ToListAsync();

			return Ok(departmentDepartures);
		}

		[HttpGet("departure_cities")]
		public async Task<IActionResult> GetDepartureCities()
		{
			var cities = await db.DepartmentDepartures
				.Include(departmentDeparture => departmentDeparture.City)
				.Select(departmentDeparture => new CityDto
				{
					Id = departmentDeparture.City.Id,
					Name = departmentDeparture.City.Name
				})
				.GroupBy(city => city.Id)
				.Select(city => city.First())
				.ToListAsync();

			return Ok(cities);
		}

		[HttpGet("transport_types")]
		public async Task<IActionResult> GetTransportTypes()
		{
			var transportTypes = await db.TransportTypes
				.Select(transportType => new DepartmentDepartureDto
				{
					Id = transportType.Id,
					Name = transportType.Name,
				})
				.OrderBy(transportType => transportType.Id)
				.ToListAsync();

			return Ok(transportTypes);
		}
	}
}
