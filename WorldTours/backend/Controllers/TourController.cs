using backend.DB;
using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace backend.Controllers
{
	public  class TourController : Controller
	{
		private AppDbContext db;
		public TourController(AppDbContext context)
		{
			db = context;
		}
		public IActionResult Types()
		{
			return Ok(db.TourTypes.Select(tt => new TourTypeDto { Id = tt.Id, Name = tt.Name, ImageUrl = $"{"data:image/svg+xml;base64,"}{Convert.ToBase64String(tt.Image)}" }));
		}

		//public async Task<IActionResult> Characteristics()
		//{
		//	var g = await db.CharacteristicTypes.Include(ct => ct.Characteristics).ToListAsync();
		//	return Ok(await db.CharacteristicTypes.Include(ct => ct.Characteristics).ToListAsync());
		//}

		public async Task<IActionResult> Characteristics([FromQuery]int id)
		{
			var characteristicTypes = await db.CharacteristicTypes
				.Include(ct => ct.Characteristics)
				.ThenInclude(c => c.TourTypes)
				.Where(ct => ct.Characteristics.Any(c => c.TourTypes.Any(tt => tt.Id == id)))
				.Select(ct => new CharacteristicTypeDto
				{
					Id = ct.Id,
					Name = ct.Name,
					Characteristics = ct.Characteristics
						.Where(c => c.TourTypes.Any(tt => tt.Id == id))
						.Select(c => new CharacteristicDto
						{
							Id = c.Id,
							Name = c.Name,
							TourTypes = c.TourTypes
								.Where(tt => tt.Id == id)
								.Select(tt => new TourTypeDto
								{
									Id = tt.Id,
									Name = tt.Name
								})
								.ToList()
						})
						.ToList()
				})
				.ToListAsync();
			return Ok(characteristicTypes);
		}
	}
}
