using backend.DB;
using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
	public class RouteController : Controller
	{
		private AppDbContext db;
		public RouteController(AppDbContext context)
		{
			db = context;
		}
		public IActionResult DepartmentDepartures()
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
				})
			);
		}

		public IActionResult TransportTypes()
		{
			return Ok(db.TransportTypes.Select(transportType => new DepartmentDepartureDto
				{
					Id = transportType.Id,
					Name = transportType.Name,
				})
			);
		}
	}
}
