namespace backend.Models.DTOs
{
	public class PaymentResponse
	{
		public string clientSecret { get; set; } = null!;
		public string error { get; set; } = null!;
	}
}
