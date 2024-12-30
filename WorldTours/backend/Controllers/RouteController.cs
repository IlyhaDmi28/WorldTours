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
			try
			{
				List<DepartmentDeparture> departmentDepartures = await db.DepartmentDepartures
					.Include(dd => dd.City)
					.ThenInclude(c => c.Country)
					.OrderBy(dd => dd.Id)
					.ToListAsync();

				return Ok(departmentDepartures.Select(dd => new DepartmentDepartureDto
				{
					Id = dd.Id,
					Name = dd.Name,
					City = dd.City.Name,
					Country = dd.City.Country.Name
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("departure_cities")]
		public async Task<IActionResult> GetDepartureCities()
		{
			try
			{
				List<DepartmentDeparture> cities = await db.DepartmentDepartures
					.Include(dd => dd.City)
					.ToListAsync();

				return Ok(cities
					.Select(dd => new CityDto
					{
						Id = dd.City.Id,
						Name = dd.City.Name
					})
					.GroupBy(c => c.Id)
					.Select(c => c.First())
				);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("transport_types")]
		public async Task<IActionResult> GetTransportTypes()
		{
			try
			{
				List<TransportType> transportTypes = await db.TransportTypes
					.OrderBy(tt => tt.Id)
					.ToListAsync();

				return Ok(transportTypes.Select(tt => new DepartmentDepartureDto
				{
					Id = tt.Id,
					Name = tt.Name,
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
