using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Models.Forms;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using System.Security.Claims;
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

		[Authorize(Roles = "User")]
		public async Task<IActionResult> AddBooking([FromBody] RequestForBookingForm requestForBooking)
		{
			try
			{
				Booking booking = await db.Bookings.FirstOrDefaultAsync(b => b.UserId == requestForBooking.UserId && b.RouteId == requestForBooking.RouteId);
				if (booking != null) return Conflict(new { message = "Вы уже заказали данный тур." });

				Route route = await db.Routes.FirstOrDefaultAsync(r => r.Id == requestForBooking.RouteId);
				if (route == null) return BadRequest();

				User user = await db.Users.FirstOrDefaultAsync(r => r.Id == requestForBooking.UserId);
				if (user == null) return Unauthorized();

				//List<BookedRoomType> bookedRoomTypes = new List<BookedRoomType>();
				//foreach (BookedRoomTypeForm bookedRoomType in requestForBooking.BookedRoomTypes)
				//{
				//	RoomType roomType = await db.RoomTypes.FirstOrDefaultAsync(rt => rt.Id == bookedRoomType.Id);
				//	if (roomType == null) return BadRequest();

				//	if()

				//}

				

				int remainingSeatsNumber = (int)route.SeatsNumber - (int)requestForBooking.OrderSeatsNumber;

				if (remainingSeatsNumber >= 0)
				{
					using (var transaction = await db.Database.BeginTransactionAsync())
					{
						try
						{
							Booking newBooking = new Booking()
							{
								UserId = requestForBooking.UserId,
								RouteId = requestForBooking.RouteId,
								OrderSeatsNumber = requestForBooking.OrderSeatsNumber,
								Price = requestForBooking.Price,
								Comment = requestForBooking.Comment,
								PrioritySeatsInTransport = requestForBooking.PrioritySeatsInTransport,
								HasСhildren = requestForBooking.HasСhildren,
							};

							await db.Bookings.AddAsync(newBooking);
							await db.SaveChangesAsync();


							List<BookedRoomType> newBookedRoomTypes = new List<BookedRoomType>(); ;

							foreach (BookedRoomTypeForm bookedRoomType in requestForBooking.BookedRoomTypes)
							{
								if (bookedRoomType.OrderRoomsNumber != null && bookedRoomType.OrderRoomsNumber != 0) newBookedRoomTypes.Add(new BookedRoomType
								{
									RoomTypeID = bookedRoomType.Id,
									BookingID = newBooking.Id,
									OrderRoomsNumber = bookedRoomType.OrderRoomsNumber,
								});
							}
							await db.BookedRoomTypes.AddRangeAsync(newBookedRoomTypes);
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

		[Authorize(Roles = "User")]
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
					TourPhotoUrl = $"https://localhost:7276/uploads/tours/{b.Route.Tour.Id}/0.jpg",
					LandingDateOfDeparture = b.Route.LandingDateOfDeparture?.ToString("dd.MM.yyyy"),
					LandingDateOfReturn = b.Route.LandingDateOfReturn?.ToString("dd.MM.yyyy"),
					LandingTimeOfDeparture = b.Route.LandingTimeOfDeparture?.ToString(@"hh\:mm"),
					LandingTimeOfReturn = b.Route.LandingTimeOfReturn?.ToString(@"hh\:mm"),
					ArrivalDateOfDeparture = b.Route.ArrivalDateOfDeparture?.ToString("dd.MM.yyyy"),
					ArrivalDateOfReturn = b.Route.ArrivalDateOfReturn?.ToString("dd.MM.yyyy"),
					ArrivalTimeOfDeparture = b.Route.ArrivalTimeOfDeparture?.ToString(@"hh\:mm"),
					ArrivalTimeOfReturn = b.Route.ArrivalTimeOfReturn?.ToString(@"hh\:mm"),
					Price = b.Price,
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

		[HttpGet("get")]
		public async Task<IActionResult> GetBooking([FromQuery] int? bookingId = null)
		{
			try
			{
				Booking booking = await db.Bookings
					.Include(b => b.Route)
					.ThenInclude(r => r.Tour)
					.ThenInclude(t => t.Hotel)
					.ThenInclude(h => h.City)
					.ThenInclude(c => c.Country)
					.Include(b => b.Route)
					.ThenInclude(r => r.DepartmentDeparture)
					.ThenInclude(dd =>dd.City)
					.ThenInclude(c => c.Country)
					.Include(b => b.Route)
					.ThenInclude(r => r.DepartmentDeparture)
					.ThenInclude(dd =>dd.TransportType)
					.Include(tt => tt.BookedRoomTypes)
					.ThenInclude(brt => brt.RoomType)
					.ThenInclude(rt => rt.Characteristics)
					.FirstOrDefaultAsync(b => b.Id == bookingId);

				if (booking == null) return NotFound();


				string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "tours", booking.Route.Tour.Id.ToString());

				string? fileUrl = null;

				// Проверяем, существует ли папка
				if (Directory.Exists(folderPath))
				{
					fileUrl = $"https://localhost:7276/uploads/tours/{booking.Route.Tour.Id}/0.jpg";
				}
				else
				{
					Console.WriteLine("Папка не найдена.");
				}

				return Ok(new BookingDto
				{
					Id = booking.Id,
					TourId = booking.Route.Tour.Id,
					RouteId = booking.Route.Id,
					TourName = booking.Route.Tour.Name,
					TourPhotoUrl = fileUrl,
					Price = booking.Price,
					OrderSeatsNumber = booking.OrderSeatsNumber,
					Status = booking.Status,
					HasChildren = booking.HasСhildren,
					PrioritySeatsInTransport = booking.PrioritySeatsInTransport,
					Comment = booking.Comment,
					Route = new RouteForBookingDto 
					{
						Id = booking.Route.Id,
						LandingDateOfDeparture = booking.Route.LandingDateOfDeparture?.ToString("dd.MM.yyyy"),
						LandingDateOfReturn = booking.Route.LandingDateOfReturn?.ToString("dd.MM.yyyy"),
						LandingTimeOfDeparture = booking.Route.LandingTimeOfDeparture?.ToString(@"hh\:mm"),
						LandingTimeOfReturn = booking.Route.LandingTimeOfReturn?.ToString(@"hh\:mm"),
						ArrivalDateOfDeparture = booking.Route.ArrivalDateOfDeparture?.ToString("dd.MM.yyyy"),
						ArrivalDateOfReturn = booking.Route.ArrivalDateOfReturn?.ToString("dd.MM.yyyy"),
						ArrivalTimeOfDeparture = booking.Route.ArrivalTimeOfDeparture?.ToString(@"hh\:mm"),
						ArrivalTimeOfReturn = booking.Route.ArrivalTimeOfReturn?.ToString(@"hh\:mm"),
						DepartmentDeparture = new DepartmentDepartureDto
						{ 
							Id = booking.Route.DepartmentDeparture.Id,
							Name = booking.Route.DepartmentDeparture.Name,
							Address = booking.Route.DepartmentDeparture.Address,
							City = booking.Route.DepartmentDeparture.City.Name,
							Country = booking.Route.DepartmentDeparture.City.Country.Name,
						},
						TranportTypeName = booking.Route.DepartmentDeparture.TransportType.Name
					},
					Hotel = new HotelForBookingDto
					{
						Id = booking.Route.Tour.Hotel.Id,
						Name = booking.Route.Tour.Hotel.Name,
						City = booking.Route.Tour.Hotel.City.Name,
						Country = booking.Route.Tour.Hotel.City.Country.Name,
						Address = booking.Route.Tour.Hotel.Address,
						StarsNumber = booking.Route.Tour.Hotel.StarsNumber,
						RoomTypes = booking.BookedRoomTypes.Select(brt => new RoomTypeForBookingDto
						{
							Id = brt.RoomType.Id,
							Name = brt.RoomType.Name,
							Price = brt.RoomType.Price,
							SeatsNumber = brt.RoomType.SeatsNumber,
							OrderRoomsNumber = brt.OrderRoomsNumber,
							Characteristics = brt.RoomType.Characteristics.Select(c => new CharacteristicDto
							{
								Id = c.Id,
								Name = c.Name,
							}).ToList(),
						}).ToList(),
					} 
				});
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Manager, Admin")]
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
					TourPhotoUrl = $"https://localhost:7276/uploads/tours/{b.Route.Tour.Id}/0.jpg",
					LandingDateOfDeparture = b.Route.LandingDateOfDeparture?.ToString("dd.MM.yyyy"),
					LandingDateOfReturn = b.Route.LandingDateOfReturn?.ToString("dd.MM.yyyy"),
					LandingTimeOfDeparture = b.Route.LandingTimeOfDeparture?.ToString(@"hh\:mm"),
					LandingTimeOfReturn = b.Route.LandingTimeOfReturn?.ToString(@"hh\:mm"),
					ArrivalDateOfDeparture = b.Route.ArrivalDateOfDeparture?.ToString("dd.MM.yyyy"),
					ArrivalDateOfReturn = b.Route.ArrivalDateOfReturn?.ToString("dd.MM.yyyy"),
					ArrivalTimeOfDeparture = b.Route.ArrivalTimeOfDeparture?.ToString(@"hh\:mm"),
					ArrivalTimeOfReturn = b.Route.ArrivalTimeOfReturn?.ToString(@"hh\:mm"),
					Price = b.Price,
					OrderSeatsNumber = b.OrderSeatsNumber,
					Status = b.Status,
					User = new UserDto()
					{
						Name = b.User.Name,
						Surname = b.User.Surname,
						Email = b.User.Email,
						PhoneNumber = b.User.PhoneNumber,
						PhotoUrl = $"https://localhost:7276/uploads/users/{b.User.Id}/0.png",
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

		//[Authorize(Roles = "Manager, Admin")]
		[HttpPatch("change_price")]
		public async Task<IActionResult> ChangePrice([FromQuery]int price, [FromQuery] int? bookingId)
		{
			try
			{
				using (var transaction = await db.Database.BeginTransactionAsync())
				{
					try
					{
						Booking editedBooking = await db.Bookings.FirstOrDefaultAsync(b => b.Id == bookingId);

						if (editedBooking == null) return NotFound();
						editedBooking.Price = price;
						
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

		[Authorize]
		[HttpDelete("delete")]
		public async Task<IActionResult> DeleteBooking([FromQuery] int? bookingId)
		{
			try
			{
				using (var transaction = await db.Database.BeginTransactionAsync())
				{
					try
					{
						Booking removedBooking = await db.Bookings.Include(b => b.BookedRoomTypes).FirstOrDefaultAsync(b => b.Id == bookingId);
						if (removedBooking == null) return NotFound();


						
						db.BookedRoomTypes.RemoveRange(removedBooking.BookedRoomTypes); // Сначала удаляем связанные записи
						db.Bookings.Remove(removedBooking); // Потом удаляем саму бронь
						await db.SaveChangesAsync();
						//Route route = await db.Routes.FirstOrDefaultAsync(r => r.Id == removedBooking.RouteId);
						//if (route != null)
						//{
						//	route.SeatsNumber += removedBooking.OrderSeatsNumber;
						//}

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

		[Authorize(Roles = "Manager, Admin")]
		[HttpPatch("confirm")]
		public async Task<IActionResult> ConfirmBooking([FromQuery] int? bookingId)
		{
			try
			{
				Booking confirmedBooking = await db.Bookings.FirstOrDefaultAsync(b => b.Id == bookingId);
				if (confirmedBooking == null) return NotFound();

				confirmedBooking.Status = 1;
				await db.SaveChangesAsync();
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("filtred_bookings")]
		public async Task<IActionResult> GetFiltredBookings([FromBody] BookingFilterForm filter, [FromQuery] int userId)
		{
			try
			{

				//List<Tour> tours = await db.Tours.Include(t => t.Characteristics).ToListAsync();
				List<Booking> bookings = await db.Bookings
					.Include(b => b.Route)
					.ThenInclude(r => r.Tour)
					.ThenInclude(t => t.Hotel)
					.ThenInclude(h => h.City)
					.ThenInclude(c => c.Country)
					.Include(b => b.Route)
					.ThenInclude(r => r.DepartmentDeparture)
					.ThenInclude(r => r.City)
					.ThenInclude(r => r.Country)
					.Include(b => b.User)
					.ToListAsync();

				if(userId != 0) bookings = bookings.Where(b => b.UserId == userId).ToList();

				if (filter != null)
				{
					if (filter.CityId != 0 && filter.CityId != null) bookings = bookings.Where(b => b.Route.Tour.Hotel.CityId == filter.CityId).ToList();
					if (filter.CountryId != 0 && filter.CountryId != null) bookings = bookings.Where(b => b.Route.Tour.Hotel.City.CountryId == filter.CountryId).ToList();
					if (filter.CountryId != 0 && filter.CountryId != null) bookings = bookings.Where(b => b.Route.Tour.Hotel.City.CountryId == filter.CountryId).ToList();
					if (filter.BookingStatus == 0) bookings = bookings.Where(b => b.Status == null).ToList();
					else if (filter.BookingStatus != null) bookings = bookings.Where(b => b.Status == filter.BookingStatus).ToList();

					if (filter.MinLandingDateOfDeparture != null && filter.MinLandingDateOfDeparture != "") bookings = bookings.Where(b => b.Route.LandingDateOfDeparture >= DateService.ConvertToDateFormat(filter.MinLandingDateOfDeparture)).ToList();
					if (filter.MinArrivalDateOfDeparture != null && filter.MinArrivalDateOfDeparture != "") bookings = bookings.Where(b => b.Route.ArrivalDateOfDeparture >= DateService.ConvertToDateFormat(filter.MinArrivalDateOfDeparture)).ToList();
					if (filter.MinLandingDateOfReturn != null && filter.MinLandingDateOfReturn != "") bookings = bookings.Where(b => b.Route.LandingDateOfReturn >= DateService.ConvertToDateFormat(filter.MinLandingDateOfReturn)).ToList();
					if (filter.MinArrivalDateOfReturn != null && filter.MinArrivalDateOfReturn != "") bookings = bookings.Where(b => b.Route.ArrivalDateOfReturn >= DateService.ConvertToDateFormat(filter.MinArrivalDateOfReturn)).ToList();
					
					if (filter.MaxLandingDateOfDeparture != null && filter.MaxLandingDateOfDeparture != "") bookings = bookings.Where(b => b.Route.LandingDateOfDeparture <= DateService.ConvertToDateFormat(filter.MaxLandingDateOfDeparture)).ToList();
					if (filter.MaxArrivalDateOfDeparture != null && filter.MaxArrivalDateOfDeparture != "") bookings = bookings.Where(b => b.Route.ArrivalDateOfDeparture <= DateService.ConvertToDateFormat(filter.MaxArrivalDateOfDeparture)).ToList();
					if (filter.MaxLandingDateOfReturn != null && filter.MaxLandingDateOfReturn != "") bookings = bookings.Where(b => b.Route.LandingDateOfReturn <= DateService.ConvertToDateFormat(filter.MaxLandingDateOfReturn)).ToList();
					if (filter.MaxArrivalDateOfReturn != null && filter.MaxArrivalDateOfReturn != "") bookings = bookings.Where(b => b.Route.ArrivalDateOfReturn <= DateService.ConvertToDateFormat(filter.MaxArrivalDateOfReturn)).ToList();
					
					if (filter.DepartmentDepartureId != 0 && filter.DepartmentDepartureId != null) bookings = bookings.Where(b => b.Route.DepartmentDepartureId == filter.DepartmentDepartureId).ToList();
				}

				if (userId != 0)
				{
					return Ok(bookings.Select(b => new BookingCardDto()
					{
						Id = b.Id,
						TourName = b.Route.Tour.Name,
						TourId = b.Route.Tour.Id,
						RouteId = b.Route.Id,
						TourPhotoUrl = $"https://localhost:7276/uploads/tours/{b.Route.Tour.Id}/0.jpg",
						LandingDateOfDeparture = b.Route.LandingDateOfDeparture?.ToString("dd.MM.yyyy"),
						LandingDateOfReturn = b.Route.LandingDateOfReturn?.ToString("dd.MM.yyyy"),
						LandingTimeOfDeparture = b.Route.LandingTimeOfDeparture?.ToString(@"hh\:mm"),
						LandingTimeOfReturn = b.Route.LandingTimeOfReturn?.ToString(@"hh\:mm"),
						ArrivalDateOfDeparture = b.Route.ArrivalDateOfDeparture?.ToString("dd.MM.yyyy"),
						ArrivalDateOfReturn = b.Route.ArrivalDateOfReturn?.ToString("dd.MM.yyyy"),
						ArrivalTimeOfDeparture = b.Route.ArrivalTimeOfDeparture?.ToString(@"hh\:mm"),
						ArrivalTimeOfReturn = b.Route.ArrivalTimeOfReturn?.ToString(@"hh\:mm"),
						Price = b.Price,
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
				else
				{
					return Ok(bookings.Select(b => new BookingCardForManagerDto()
					{
						Id = b.Id,
						TourName = b.Route.Tour.Name,
						TourId = b.Route.Tour.Id,
						RouteId = b.Route.Id,
						TourPhotoUrl = $"https://localhost:7276/uploads/tours/{b.Route.Tour.Id}/0.jpg",
						LandingDateOfDeparture = b.Route.LandingDateOfDeparture?.ToString("dd.MM.yyyy"),
						LandingDateOfReturn = b.Route.LandingDateOfReturn?.ToString("dd.MM.yyyy"),
						LandingTimeOfDeparture = b.Route.LandingTimeOfDeparture?.ToString(@"hh\:mm"),
						LandingTimeOfReturn = b.Route.LandingTimeOfReturn?.ToString(@"hh\:mm"),
						ArrivalDateOfDeparture = b.Route.ArrivalDateOfDeparture?.ToString("dd.MM.yyyy"),
						ArrivalDateOfReturn = b.Route.ArrivalDateOfReturn?.ToString("dd.MM.yyyy"),
						ArrivalTimeOfDeparture = b.Route.ArrivalTimeOfDeparture?.ToString(@"hh\:mm"),
						ArrivalTimeOfReturn = b.Route.ArrivalTimeOfReturn?.ToString(@"hh\:mm"),
						Price = b.Price,
						OrderSeatsNumber = b.OrderSeatsNumber,
						Status = b.Status,
						User = new UserDto()
						{
							Name = b.User.Name,
							Surname = b.User.Surname,
							Email = b.User.Email,
							PhoneNumber = b.User.PhoneNumber,
							PhotoUrl = $"https://localhost:7276/uploads/users/{b.User.Id}/0.png",
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
				
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
