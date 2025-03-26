using Stripe;

namespace backend.Services
{
	public interface IPaymentService
	{
		PaymentIntent CreatePaymentIntent(long amount, string currency, List<string> paymentMethodTypes);
	}
	public class PaymentService : IPaymentService
	{
		public PaymentService()
		{
			StripeConfiguration.ApiKey = "sk_test_51R6wDJB7IRhuOKNWFHnsXNwGARhaP9yjdTH4EG0Q2Ufq6jcElbtqkoBAgr4bkzRMkoAY6hMj9yUsIiEv436JxAIA00tdEAZTLX";
		}

		public PaymentIntent CreatePaymentIntent(long amount, string currency, List<string> paymentMethodTypes)
		{
			var options = new PaymentIntentCreateOptions
			{
				Amount = amount,
				Currency = currency,
				PaymentMethodTypes = paymentMethodTypes,
			};
			var service = new PaymentIntentService();
			return service.Create(options);
		}
	}
}
