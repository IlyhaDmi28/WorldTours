using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Models.Forms;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;


namespace backend.Controllers
{
	[Route("hotel")]
	public class HotelController : Controller
	{
		private AppDbContext db;
		public HotelController(AppDbContext context)
		{
			db = context;
		}

		[HttpGet("characteristics")]
		public async Task<IActionResult> GetCharacteristics()
		{
			try
			{
				List<HotelCharacteristic> characteristics = await db.HotelCharacteristics.ToListAsync();

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

		[Authorize(Roles = "Manager, Admin")]
		[HttpPost("add")]
		public async Task<IActionResult> AddHotel([FromForm] HotelForm hotel)
		{
			try
			{
				if (hotel.Id == 0)
				{
					using (var transaction = await db.Database.BeginTransactionAsync())
					{
						try
						{
							Hotel newHotel = new Hotel()
							{
								Name = hotel.Name,
								MainDescription = hotel.MainDescription,
								CityId = hotel.CityId,
								Address = hotel.Address,
								StarsNumber = hotel.StarsNumber,
								NutritionTypeId = hotel.NutritionTypeId,
								PhotosDirectory = hotel.Name,
								//Characteristics = (ICollection<HotelCharacteristic>)hotel.Characteristics,
							};


							await db.Hotels.AddAsync(newHotel);
							await db.SaveChangesAsync();

							await db.RoomTypes.AddRangeAsync(hotel.RoomTypes.Select(rt => new RoomType()
							{
								Name = rt.Name,
								SeatsNumber = rt.SeatsNumber,
								RoomsNumber = rt.RoomsNumber,
								Price = rt.Price,
								HotelId = newHotel.Id,

								//Characteristics = (ICollection<RoomTypeCharacteristic>)hotel.Characteristics,
							}));
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

				return BadRequest();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
