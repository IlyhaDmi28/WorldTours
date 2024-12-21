namespace backend.Models.Forms
{
	public class ReviewForm
	{
		public int? UserId { get; set; }
		public int? TourId { get; set; }
		public string? ReviewText { get; set; }
	}
}
