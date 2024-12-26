namespace backend.Models.DTOs
{
	public class TourCardForEditor
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? Country { get; set; }
		public string? City { get; set; }
		public int? StarsNumber { get; set; }
		public string? PhotoUrl { get; set; }
	}
}
