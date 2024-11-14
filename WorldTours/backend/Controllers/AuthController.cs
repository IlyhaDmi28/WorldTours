using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{

    public class AuthController : Controller
    {
        private List<UserModel> users = new List<UserModel>()
        {
           new UserModel(1, "xxx", "1234", UserRole.USER, "LOH", "PIDOR", "3333"),
           new UserModel(2, "ccc", "1234", UserRole.USER, "LOH", "PIDOR", "3333")
        };

        [Authorize]
        public IActionResult Auth()
        {
            UserModel user = users.FirstOrDefault(u => u.Email == User.FindFirst(ClaimTypes.Email)?.Value);
            return user != null ? Ok(user) : Unauthorized();
        }
        public IActionResult Login([FromBody] LoginModel login)
        {
            return users.FirstOrDefault(u => u.Email == login.Email && u.Password == login.Password) != null ? Ok(new { token = TokenSevice.GenerateToken(login.Email) }) : Unauthorized();
        }
    }
}
