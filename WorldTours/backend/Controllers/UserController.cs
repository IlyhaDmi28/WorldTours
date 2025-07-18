﻿using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Models.Forms;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
	[Route("user")]
	public class UserController : Controller
	{
		private AppDbContext db;
		public UserController(AppDbContext context)
		{
			db = context;
		}

		[Authorize]
		[HttpPut("edit")]
		public async Task<IActionResult> EditUser([FromForm] UserForm user)
		{
			try
			{
				User editUser = await db.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
				if (editUser == null) return NotFound();

				editUser.Name = user.Name;
				editUser.Surname = user.Surname;
				editUser.PhoneNumber = user.PhoneNumber;
				if (user.PhotoFile != null) 
				{
					string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "users");
					if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

					if (user.PhotoFile.Length > 0)
					{
						string filePath = Path.Combine(uploadsFolder, $"{user.Id}.png");
						using var fileStream = new FileStream(filePath, FileMode.Create);
						await user.PhotoFile.CopyToAsync(fileStream);
					}
				} /*editUser.Photo = await PhotoService.ConvertToBytes(user.PhotoFile);*/

				await db.SaveChangesAsync();
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Admin")]
		[HttpPatch("block")]
		public async Task<IActionResult> BlockUser([FromQuery] int? userId)
		{
			try
			{
				User blockedUser = await db.Users.FirstOrDefaultAsync(u => u.Id == userId);
				if (blockedUser == null) return NotFound();

				blockedUser.BlockedStatus = !blockedUser.BlockedStatus;
				await db.SaveChangesAsync();
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Admin")]
		[HttpDelete("delete")]
		public async Task<IActionResult> DeleteUser([FromQuery] int? userId)
		{
			try
			{
				User removedUser = await db.Users.FirstOrDefaultAsync(u => u.Id == userId);
				if (removedUser == null) return NotFound();

				string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "users");
				if (System.IO.File.Exists(uploadsFolder + $"\\{userId}.png")) System.IO.File.Delete(uploadsFolder + $"\\{userId}.png");
	

				db.Users.Remove(removedUser);
				await db.SaveChangesAsync();
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Admin")]
		[HttpPatch("change_role")]
		public async Task<IActionResult> ChangeRole([FromQuery] int? userId, [FromQuery] UserRole? roleId)
		{
			try
			{
				User editedUser = await db.Users.FirstOrDefaultAsync(u => u.Id == userId);
				if (editedUser == null) return NotFound();

				editedUser.Role = (UserRole)roleId;
				await db.SaveChangesAsync();
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Admin")]
		[HttpGet("users")]
		public async Task<IActionResult> GetUsers([FromQuery] bool? blockedStatus, [FromQuery] bool isOnlyViolators = false)
		{
			try
			{
				List<User> users = await db.Users
					.Include(u => u.Bookings)
					.ThenInclude(u => u.Route)
					.ToListAsync();

				if(blockedStatus != null) users = users.Where(u => u.BlockedStatus == blockedStatus).ToList();
				if(isOnlyViolators) users = users.Where(u => u.Bookings.Count(b => b.Status != 2 && b.Route.LandingDateAndTimeOfDeparture < DateTime.Now) > 0).ToList();

				return Ok(users.Select(u => new UserDto()
				{
					Id = u.Id,
					Name = u.Name,
					Surname = u.Surname,
					PhotoUrl = $"https://localhost:7276/uploads/users/{u.Id}.png",
					Email = u.Email,
					PhoneNumber = u.PhoneNumber,
					Role = u.Role,
					BlockedStatus = u.BlockedStatus,
					NumberOfUnpaidBooking = u.Bookings.Count(b => b.Status != 2 &&  b.Route.LandingDateAndTimeOfDeparture < DateTime.Now),
				})
				.ToList());
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
