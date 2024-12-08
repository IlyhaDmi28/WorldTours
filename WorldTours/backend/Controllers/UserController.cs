using backend.DB;
using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
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
			User editUser = db.Users.FirstOrDefault(u => u.Id == user.Id);

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

				//db.Users.Update(editUser);
				db.SaveChanges();
				return Ok();
			}

			return BadRequest();
		}
	}
}
