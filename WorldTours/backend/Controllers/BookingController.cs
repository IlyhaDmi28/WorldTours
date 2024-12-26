using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Models.Forms;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
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
		public async Task<IActionResult> AddBooking([FromBody] ApplicationForBookingForm applicationForBooking)
		{
			try
			{
				Booking booking = await db.Bookings.FirstOrDefaultAsync(b => b.UserId == applicationForBooking.UserId && b.RouteId == applicationForBooking.RouteId);
				if (booking != null) return Conflict(new { message = "Вы уже заказали данный тур." });

				Route route = await db.Routes.FirstOrDefaultAsync(r => r.Id == applicationForBooking.RouteId);
				if (route == null) return BadRequest();

				User user = await db.Users.FirstOrDefaultAsync(r => r.Id == applicationForBooking.UserId);
				if (user == null) return Unauthorized();

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
				else return Conflict(new { message = "Недостаточно мест." });
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("bookings")]
		public async Task<IActionResult> GetBookings([FromQuery] int? userId)
		{
			try
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
					TourId = b.Route.Tour.Id,
					RouteId = b.Route.Id,
					TourPhotoUrl = PhotoService.ConvertToBase64(b.Route.Tour.Photo, "png"),
					LandingDateOfDeparture = b.Route.LandingDateOfDeparture?.ToString("dd.MM.yyyy"),
					LandingDateOfReturn = b.Route.LandingDateOfReturn?.ToString("dd.MM.yyyy"),
					LandingTimeOfDeparture = b.Route.LandingTimeOfDeparture?.ToString(@"hh\:mm"),
					LandingTimeOfReturn = b.Route.LandingTimeOfReturn?.ToString(@"hh\:mm"),
					ArrivalDateOfDeparture = b.Route.ArrivalDateOfDeparture?.ToString("dd.MM.yyyy"),
					ArrivalDateOfReturn = b.Route.ArrivalDateOfReturn?.ToString("dd.MM.yyyy"),
					ArrivalTimeOfDeparture = b.Route.ArrivalTimeOfDeparture?.ToString(@"hh\:mm"),
					ArrivalTimeOfReturn = b.Route.ArrivalTimeOfReturn?.ToString(@"hh\:mm"),
					Price = b.Route.Price,
					OrderSeatsNumber = b.OrderSeatsNumber,
					Status = b.Status,
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
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("bookings_for_manager")]
		public async Task<IActionResult> GetBookingsForManager()
		{
			try
			{
				List<Booking> bookings = await db.Bookings
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

				foreach (Booking booking in bookings)
				{
					booking.User = await db.Users.FirstOrDefaultAsync(u => u.Id == booking.UserId);
				}

				return Ok(bookings.Select(b => new BookingCardForManagerDto()
				{
					Id = b.Id,
					TourName = b.Route.Tour.Name,
					TourId = b.Route.Tour.Id,
					RouteId = b.Route.Id,
					TourPhotoUrl = PhotoService.ConvertToBase64(b.Route.Tour.Photo, "png"),
					LandingDateOfDeparture = b.Route.LandingDateOfDeparture?.ToString("dd.MM.yyyy"),
					LandingDateOfReturn = b.Route.LandingDateOfReturn?.ToString("dd.MM.yyyy"),
					LandingTimeOfDeparture = b.Route.LandingTimeOfDeparture?.ToString(@"hh\:mm"),
					LandingTimeOfReturn = b.Route.LandingTimeOfReturn?.ToString(@"hh\:mm"),
					ArrivalDateOfDeparture = b.Route.ArrivalDateOfDeparture?.ToString("dd.MM.yyyy"),
					ArrivalDateOfReturn = b.Route.ArrivalDateOfReturn?.ToString("dd.MM.yyyy"),
					ArrivalTimeOfDeparture = b.Route.ArrivalTimeOfDeparture?.ToString(@"hh\:mm"),
					ArrivalTimeOfReturn = b.Route.ArrivalTimeOfReturn?.ToString(@"hh\:mm"),
					Price = b.Route.Price,
					OrderSeatsNumber = b.OrderSeatsNumber,
					Status = b.Status,
					User = new UserDto()
					{
						Name = b.User.Name,
						Surname = b.User.Surname,
						Email = b.User.Email,
						PhoneNumber = b.User.PhoneNumber,
						PhotoUrl = PhotoService.ConvertToBase64(b.User.Photo, "png"),
					},
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
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpDelete("delete")]
		public async Task<IActionResult> DeleteBooking([FromQuery] int? bookingId)
		{
			try
			{
				Booking removedBooking = await db.Bookings.FirstOrDefaultAsync(b => b.Id == bookingId);
				if (removedBooking == null) return NotFound();

				db.Bookings.Remove(removedBooking);
				await db.SaveChangesAsync();
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPatch("confirm")]
		public async Task<IActionResult> ConfirmBooking([FromQuery] int? bookingId)
		{
			try
			{
				Booking confirmedBooking = await db.Bookings.FirstOrDefaultAsync(b => b.Id == bookingId);
				if (confirmedBooking == null) return NotFound();

				confirmedBooking.Status = true;
				await db.SaveChangesAsync();
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
