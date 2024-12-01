using backend.DB;
using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.PortableExecutable;
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
			var characteristics = await db.Characteristics
				.Include(c => c.TourTypes)
				.Where(c => c.TourTypes.Any(tt => tt.Id == id))
				.Select(c => new DescriptionWithCharacteriscDto
				{
					Characteristic = new CharacteristicDto() { Id = c.Id, Name = c.Name},
					Description = new DescriptionDto() { Id = 0, Value = false},
				}).ToListAsync();
			return Ok(characteristics);
		}

		public IActionResult NutritionTypes()
		{
			return Ok(db.NutritionTypes.Select(nutritionType => new NutritionTypeDto
				{
					Id = nutritionType.Id,
					Name = nutritionType.Name,
				}).OrderBy(nutritionType => nutritionType.Id)
			);
		}

		[HttpGet()]
		public IActionResult GetTour(int? id = null)
		{
			TourDto tour;
			if (id == null)
			{
				tour = new TourDto() 
				{
					Id = 0,
					Name = "Хуета",
					MainDescription = string.Empty,
					HotelId = null,
					NutritionTypeId = 1,
					TourTypeId = 1,
					Photo = null,
					Routes = new List<Models.Route>(),	
					Descriptions = new List<DescriptionWithCharacteriscDto>(),
				};
				return Ok(tour);
			}

			return Ok(null);
		}
	}
}
