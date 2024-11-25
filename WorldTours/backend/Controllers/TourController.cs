using backend.DB;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
	public class TourController : Controller
	{
		private AppDbContext db;
		public TourController(AppDbContext context)
		{
			db = context;
		}
		public IActionResult Types()
		{
			return Ok(db.TourTypes);
		}

		public IActionResult Characteristics()
		{
			return Ok(db.TourTypes);
		}
	}
}
