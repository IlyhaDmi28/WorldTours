using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    public class AuthController : Controller
    {
        public IActionResult ExecuteLogin(HttpContext context)
        {

            return View();
        }
    }
}
