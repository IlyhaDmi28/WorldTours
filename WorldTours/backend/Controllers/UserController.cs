using backend.DB;
using backend.Models.DTOs;
using backend.Models.Entity;
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

		[HttpPut]
		public async Task<IActionResult> EditUser([FromForm] UserForEditorDto user)
		{
			User editUser = await db.Users.FirstOrDefaultAsync(u => u.Id == user.Id);

			if (editUser != null)
			{
				editUser.Name = user.Name;
				editUser.Surname = user.Surname;
				editUser.PhoneNumber = user.PhoneNumber;

				if (user.PhotoFile != null)
				{
					using (var memoryStream = new MemoryStream())
					{
						await user.PhotoFile.CopyToAsync(memoryStream);
						editUser.Photo = memoryStream.ToArray(); // Преобразуем файл в массив байтов
					}
				}

				await db.SaveChangesAsync();
				return Ok();
			}

			return BadRequest();
		}
	}
}
