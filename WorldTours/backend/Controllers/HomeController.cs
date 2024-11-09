using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace backend.Controllers
{
    public class HomeController : Controller
    {
        [HttpPost]
        public string Index(string message)
        {
            return "Всё работает! Полученное сообшение: " + message;
        }
    }
}
