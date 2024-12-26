using backend.DB;
using backend.Models;
using backend.Models.DTOs;
using backend.Models.Entity;
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
			List<DepartmentDeparture> departmentDepartures = await db.DepartmentDepartures
				.Include(departmentDeparture => departmentDeparture.City)
				.ThenInclude(city => city.Country)
				.OrderBy(departmentDeparture => departmentDeparture.Id)
				.ToListAsync();

			return Ok(departmentDepartures.Select(departmentDeparture => new DepartmentDepartureDto
			{
				Id = departmentDeparture.Id,
				Name = departmentDeparture.Name,
				City = departmentDeparture.City.Name,
				Country = departmentDeparture.City.Country.Name
			}));
		}

		[HttpGet("departure_cities")]
		public async Task<IActionResult> GetDepartureCities()
		{
			List<DepartmentDeparture> cities = await db.DepartmentDepartures
				.Include(departmentDeparture => departmentDeparture.City)
				.GroupBy(city => city.Id)
				.Select(city => city.First())
				.ToListAsync();

			return Ok(cities.Select(departmentDeparture => new CityDto
			{
				Id = departmentDeparture.City.Id,
				Name = departmentDeparture.City.Name
			}));
		}

		[HttpGet("transport_types")]
		public async Task<IActionResult> GetTransportTypes()
		{
			List<TransportType> transportTypes = await db.TransportTypes
				.OrderBy(transportType => transportType.Id)
				.ToListAsync();

			return Ok(transportTypes.Select(transportType => new DepartmentDepartureDto
			{
				Id = transportType.Id,
				Name = transportType.Name,
			}));
		}
	}
}
