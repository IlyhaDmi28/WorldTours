using Stripe;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Models.DTOs;
using backend.Models.Forms;

namespace backend.Controllers
{
	[Route("payment")]
	public class PaymentController : ControllerBase
	{
		private readonly IPaymentService _paymentService;

		public PaymentController(IPaymentService paymentService)
		{
			_paymentService = paymentService;
		}

		[HttpPost("create-payment-intent")]
		public IActionResult CreatePaymentIntent([FromBody] PaymentIntentRequest request)
		{
			try
			{
				var paymentIntent = _paymentService.CreatePaymentIntent(request.Amount, request.Currency, request.PaymentMethodTypes);

				return Ok(new PaymentResponse()
				{
					clientSecret = paymentIntent.ClientSecret,
				});
			}
			catch (Exception error)
			{
				return BadRequest(new PaymentResponse()
				{
					error = error.Message,
				});
			}
		}
	}
}
