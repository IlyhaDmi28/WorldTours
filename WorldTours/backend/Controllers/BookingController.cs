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

		[HttpGet("bookings")]
		public async Task<IActionResult> GetBookings([FromQuery] int? userId)
		{
			List<Booking> bookings = await db.Bookings
				.Where(b => b.UserId == userId)
				.Include(b => b.Route)
				.ThenInclude(r => r.Tour)
				.ThenInclude(t => t.Hotel)
				.ThenInclude(h => h.City)
				.ThenInclude(c => c.Country)
				.ToListAsync();

			foreach (Booking booking in bookings)
			{
				booking.Route.DepartmentDeparture = await db.DepartmentDepartures
					.Include(dd => dd.City)
					.ThenInclude(c => c.Country)
					.FirstOrDefaultAsync(dd => dd.Id == booking.Route.DepartmentDepartureId);
			}

			return Ok(bookings.Select(b => new BookingCardDto()
			{
				Id = b.Id,
				TourName = b.Route.Tour.Name,
				TourPhotoUrl = b.Route.Tour.Photo == null ? "" : $"data:image/png;base64,{Convert.ToBase64String(b.Route.Tour.Photo)}",
				LandingDateOfDeparture = b.Route.LandingDateOfDeparture?.ToString("dd.MM.yyyy"),
				LandingDateOfReturn = b.Route.LandingDateOfReturn?.ToString("dd.MM.yyyy"),
				LandingTimeOfDeparture = b.Route.LandingTimeOfDeparture?.ToString(@"hh\:mm"),
				LandingTimeOfReturn = b.Route.LandingTimeOfReturn?.ToString(@"hh\:mm"),
				ArrivalDateOfDeparture = b.Route.ArrivalDateOfDeparture?.ToString("dd.MM.yyyy"),
				ArrivalDateOfReturn = b.Route.ArrivalDateOfReturn?.ToString("dd.MM.yyyy"),
				ArrivalTimeOfDeparture = b.Route.ArrivalTimeOfDeparture?.ToString(@"hh\:mm"),
				ArrivalTimeOfReturn = b.Route.ArrivalTimeOfReturn?.ToString(@"hh\:mm"),
				Price = b.Route.Price,
				Direction = new DirectionDto()
				{
					Hotel = b.Route.Tour.Hotel.Name,
					StarsNumber = b.Route.Tour.Hotel.StarsNumber,
					City = b.Route.Tour.Hotel.City.Name,
					Country = b.Route.Tour.Hotel.City.Country.Name,
				},
				DepartmentDeparture = new DepartmentDepartureDto()
				{
					Name = b.Route.DepartmentDeparture.Name,
					City = b.Route.DepartmentDeparture.City.Name,
					Country = b.Route.DepartmentDeparture.City.Country.Name,
				}
			}));
		}

		[HttpDelete("delete")]
		public async Task<IActionResult> DeleteBooking([FromQuery] int? bookingId)
		{
			// Удаление тура
			Booking removedBooking = await db.Bookings.FirstOrDefaultAsync(t => t.Id == bookingId);
			if (removedBooking != null)
			{
				db.Bookings.Remove(removedBooking);
				await db.SaveChangesAsync();
			}

			return Ok();
		}
	}
}
