using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Diagnostics;

namespace backend.Controllers
{
    public class MessageRequest
    {
        public string Message { get; set; }
    }

    public class HomeController : Controller
    {
        [HttpPost]
        public IActionResult Index([FromBody] MessageRequest request)
        {
            return Ok("Всё работает! Полученное сообщение: " + request.Message);
        }
    }
}
