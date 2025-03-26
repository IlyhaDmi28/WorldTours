namespace backend.Models.Forms
{
	public class PaymentIntentRequest
	{
		public long Amount { get; set; }
		public string Currency { get; set; }
		public List<string> PaymentMethodTypes { get; set; }
	}
}
