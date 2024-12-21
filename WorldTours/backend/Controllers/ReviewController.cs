using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Models.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
	[Route("review")]
	public class ReviewController : Controller
	{
		private AppDbContext db;

		public ReviewController(AppDbContext context)
		{
			db = context;
		}

		[HttpGet("reviews")]
		public async Task<IActionResult> GetReviews([FromQuery] int tourId)
		{
			return Ok(await db.Reviews.Include(r => r.User).Where(r => r.TourId == tourId).Select(r => new RewievDto()
			{
				Id = r.Id,
				UserName = r.User.Name,
				UserSurname = r.User.Surname,
				ReviewText = r.ReviewText,
			}).ToListAsync());
		}

		[HttpPost("add")]
		public async Task<IActionResult> AddReview([FromBody] ReviewForm review)
		{
			await db.Reviews.AddAsync(new Review () { TourId = review.TourId, UserId = review.UserId, ReviewText = review.ReviewText });
			await db.SaveChangesAsync();
			return Ok();
		}

		[HttpDelete("delete")]
		public async Task<IActionResult> DeleteReview([FromQuery] int tourId)
		{
			Review deletedReview = await db.Reviews.FirstOrDefaultAsync(r => r.Id == tourId);

			db.Remove(deletedReview);
			await db.SaveChangesAsync();

			return Ok();
		}
	}
}
