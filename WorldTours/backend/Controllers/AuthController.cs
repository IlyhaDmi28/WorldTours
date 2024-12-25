using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using backend.DB;
using Microsoft.EntityFrameworkCore;
using backend.Models.DTOs;
using backend.Models.Entity;

namespace backend.Controllers
{
    public class AuthController : Controller
    {
        private AppDbContext db;

        public AuthController(AppDbContext context)
        {
            db = context;
        }

        [Authorize]
        public async Task<IActionResult> Auth()
        {
            User user = await db.Users.FirstOrDefaultAsync(u => u.Email == User.FindFirst(ClaimTypes.Email).Value);
            return user != null ? Ok(new UserDto()
            {
                Id = user.Id, 
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                PhoneNumber = user.PhoneNumber,
				PhotoUrl = PhotoService.ConvertToBase64(user.Photo, "png"),
                BlockedStatus = user.BlockedStatus,
                Role = user.Role
			}) : Unauthorized();
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterForm register)
        {
            if (await db.Users.FirstOrDefaultAsync(u => u.Email == register.Email) != null) return Conflict(new { message = "Этот email уже используется." });

            await db.Users.AddAsync(new User(register));
			await db.SaveChangesAsync();

            return Ok(new { token = TokenSevice.GenerateToken(register.Email) });
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginForm login)
        {
            return await db.Users.FirstOrDefaultAsync(u => u.Email == login.Email && u.Password == login.Password) != null ? Ok(new { token = TokenSevice.GenerateToken(login.Email) }) : Unauthorized();
        }
    }
}
