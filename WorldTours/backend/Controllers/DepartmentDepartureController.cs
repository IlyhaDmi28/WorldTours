using backend.DB;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
	public class DepartmentDepartureController : Controller
	{
		private AppDbContext db;
		public DepartmentDepartureController(AppDbContext context)
		{
			db = context;
		}
		public IActionResult All()
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
	}
}
