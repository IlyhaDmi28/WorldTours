using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Models.Forms;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace backend.Controllers
{
	[Route("department_departure")]
	public class DepartmentDepartureController : Controller
	{
		private AppDbContext db;
		public DepartmentDepartureController(AppDbContext context)
		{
			db = context;
		}

		[HttpGet("department_departures")]
		public async Task<IActionResult> GetDepartmentDepartures()
		{
			try
			{
				List<DepartmentDeparture> departmentDepartures = await db.DepartmentDepartures
					.Include(dd => dd.TransportType)
					.Include(dd => dd.City)
					.ThenInclude(c => c.Country)
					.OrderBy(dd => dd.Id)
					.ToListAsync();

				return Ok(departmentDepartures.Select(dd => new DepartmentDepartureDto
				{
					Id = dd.Id,
					Name = dd.Name,
					Address = dd.Address,
					City = dd.City.Name,
					Country = dd.City.Country.Name,
					CityId = dd.City.Id,
					TransportTypeId = dd.TransportType.Id,
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Manager, Admin")]
		[HttpPost("add")]
		public async Task<IActionResult> AddDepartmentDeparture([FromForm] DepartmentDepartureForm departmentDeparture)
		{
			try
			{
				if (departmentDeparture.Id != 0) return BadRequest("Invalid hotel ID.");

				using (var transaction = await db.Database.BeginTransactionAsync())
				{
					try
					{
						DepartmentDeparture newDepartmentDeparture = new DepartmentDeparture()
						{
							Name = departmentDeparture.Name,
							TransportTypeId = departmentDeparture.TransportTypeId,
							CityId = departmentDeparture.CityId,
							Address = departmentDeparture.Address,
						};


						await db.DepartmentDepartures.AddAsync(newDepartmentDeparture);
						await db.SaveChangesAsync();

						await transaction.CommitAsync();
						return Ok();
					}
					catch
					{
						await transaction.RollbackAsync();
						return BadRequest();
					}
				}
				return BadRequest();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Manager, Admin")]
		[HttpPut("edit")]
		public async Task<IActionResult> EditDepartmentDeparture([FromForm] DepartmentDepartureForm departmentDeparture)
		{
			try
			{
				if (departmentDeparture.Id == 0) return BadRequest("Invalid hotel ID.");

				using (var transaction = await db.Database.BeginTransactionAsync())
				{
					try
					{
						DepartmentDeparture editedDepartmentDeparture = await db.DepartmentDepartures.FirstOrDefaultAsync(dd => dd.Id == departmentDeparture.Id);
						if (editedDepartmentDeparture == null) return NotFound();

						editedDepartmentDeparture.Name = departmentDeparture.Name;
						editedDepartmentDeparture.CityId = departmentDeparture.CityId;
						editedDepartmentDeparture.Address = departmentDeparture.Address;
						editedDepartmentDeparture.TransportTypeId = departmentDeparture.TransportTypeId;

						await db.SaveChangesAsync();
						await transaction.CommitAsync();

						return Ok();
					}
					catch (Exception ex)
					{
						await transaction.RollbackAsync();
						return BadRequest();
					}
				}
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Manager, Admin")]
		[HttpDelete("delete")]
		public async Task<IActionResult> DeleteDepartmentDeparture([FromQuery] int? departmentDepartureId)
		{
			try
			{
				using (var transaction = await db.Database.BeginTransactionAsync())
				{
					try
					{
						DepartmentDeparture removedDepartmentDeparture = await db.DepartmentDepartures.FirstOrDefaultAsync(dd => dd.Id == departmentDepartureId);
						if (removedDepartmentDeparture == null) return NotFound();

						db.DepartmentDepartures.Remove(removedDepartmentDeparture);
						await db.SaveChangesAsync();
						await transaction.CommitAsync();

						return Ok();
					}
					catch
					{
						await transaction.RollbackAsync();
						return BadRequest();
					}
				}
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
