using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
	[Route("room_type")]
	public class RoomTypeController : Controller
	{
		private AppDbContext db;
		public RoomTypeController(AppDbContext context)
		{
			db = context;
		}

		[HttpGet("characteristics")]
		public async Task<IActionResult> GetCharacteristics()
		{
			try
			{
				List<RoomTypeCharacteristic> characteristics = await db.RoomTypeCharacteristics.ToListAsync();

				return Ok(characteristics.Select(hc => new CharacteristicDto
				{
					Id = hc.Id,
					Name = hc.Name,
				}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
