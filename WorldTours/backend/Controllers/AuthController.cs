using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using backend.DB;
using Microsoft.EntityFrameworkCore;

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
        public IActionResult Auth()
        {
            UserModel user = db.Users.FirstOrDefault(u => u.Email == User.FindFirst(ClaimTypes.Email).Value);
            return user != null ? Ok(user) : Unauthorized();
        }

        [HttpPost]
        public IActionResult Register([FromBody] RegisterModel register)
        {
            if (db.Users.FirstOrDefault(u => u.Email == register.Email) != null) return Conflict(new { message = "Этот email уже используется." });

            db.Users.Add(new UserModel(register));
            db.SaveChanges();

            return Ok(new { token = TokenSevice.GenerateToken(register.Email) });
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginModel login)
        {
            return db.Users.FirstOrDefault(u => u.Email == login.Email && u.Password == login.Password) != null ? Ok(new { token = TokenSevice.GenerateToken(login.Email) }) : Unauthorized();
        }
    }
}
