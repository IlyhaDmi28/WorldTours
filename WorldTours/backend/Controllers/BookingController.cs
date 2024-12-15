using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Models.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Route = backend.Models.Entity.Route;

namespace backend.Controllers
{
	[Route("booking")]

	public class BookingController : Controller
	{
		private AppDbContext db;

		public BookingController(AppDbContext context)
		{
			db = context;
		}

		[HttpPost("add")]
		public async Task<IActionResult> AddBooking([FromBody] ApplicationForBooking applicationForBooking)
		{
			Booking booking = await db.Bookings.FirstOrDefaultAsync(b => b.UserId == applicationForBooking.UserId && b.RouteId == applicationForBooking.RouteId);

			if (booking != null) 
			{
				return Conflict(new { message = "Вы уже заказали данный тур." });
			}

			Route route = await db.Routes.FirstOrDefaultAsync(r => r.Id == applicationForBooking.RouteId);

			int remainingSeatsNumber = (int)route.SeatsNumber - (int)applicationForBooking.OrderSeatsNumber;

			if (remainingSeatsNumber >= 0) 
			{
				using (var transaction = await db.Database.BeginTransactionAsync())
				{
					try
					{
						route.SeatsNumber = remainingSeatsNumber;
						await db.SaveChangesAsync();

						await db.Bookings.AddAsync(new Booking() 
						{
							UserId = applicationForBooking.UserId,
							RouteId = applicationForBooking.RouteId,
							OrderSeatsNumber = applicationForBooking.OrderSeatsNumber
						});
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

			return Conflict(new { message = "Недостаточно мест." });
		}
	}
}
