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
		public IActionResult GetDepartmentDepartures()
		{
			return Ok(db.DepartmentDepartures
				.Include(departmentDeparture => departmentDeparture.City)
				.ThenInclude(city => city.Country)
				.Select(departmentDeparture => new DepartmentDepartureDto
				{
					Id = departmentDeparture.Id,
					Name = departmentDeparture.Name,
					City = departmentDeparture.City.Name,
					Country = departmentDeparture.City.Country.Name
				}).OrderBy(departmentDeparture => departmentDeparture.Id)
			);
		}

		[HttpGet("transport_types")]

		public IActionResult GetTransportTypes()
		{
			return Ok(db.TransportTypes.Select(transportType => new DepartmentDepartureDto
				{
					Id = transportType.Id,
					Name = transportType.Name,
				}).OrderBy(transportType => transportType.Id)
			);
		}
	}
}
