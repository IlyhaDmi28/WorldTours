using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
using backend.Services;
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

		[HttpPut("edit")]
		public async Task<IActionResult> EditUser([FromForm] UserForm user)
		{
			User editUser = await db.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
			if (editUser == null) return NotFound();

			editUser.Name = user.Name;
			editUser.Surname = user.Surname;
			editUser.PhoneNumber = user.PhoneNumber;
			if (user.PhotoFile != null) editUser.Photo = await PhotoService.ConvertToBytes(user.PhotoFile);

			await db.SaveChangesAsync();
			return Ok();
		}

		[HttpPatch("block")]
		public async Task<IActionResult> BlockUser([FromQuery] int userId)
		{
			User blockedUser = await db.Users.FirstOrDefaultAsync(u => u.Id == userId);
			if (blockedUser == null) return NotFound();

			blockedUser.BlockedStatus = !blockedUser.BlockedStatus;
			await db.SaveChangesAsync();
			return Ok();
		}

		[HttpDelete("delete")]
		public async Task<IActionResult> DeleteUser([FromQuery] int userId)
		{
			User removedUser = await db.Users.FirstOrDefaultAsync(u => u.Id == userId);
			if (removedUser == null) return NotFound();

			db.Users.Remove(removedUser);
			await db.SaveChangesAsync();
			return Ok();

		}

		[HttpGet("users")]
		public async Task<IActionResult> GetUsers()
		{
			return Ok(await db.Users.Select(u => new UserDto()
			{
				Id = u.Id,
				Name = u.Name,
				Surname = u.Surname,
				PhotoUrl = PhotoService.ConvertToBase64(u.Photo, "png"),
				Email = u.Email,
				PhoneNumber = u.PhoneNumber,
				Role = u.Role,
				BlockedStatus = u.BlockedStatus,
			}).ToListAsync());
		}
	}
}
