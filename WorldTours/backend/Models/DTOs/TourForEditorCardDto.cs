namespace backend.Models.DTOs
{
	public class TourForEditorCardDto
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? Country { get; set; }
		public string? City { get; set; }
		public string? Hotel { get; set; }
		public int? StarsNumber { get; set; }
		public string? TourTypeImageUrl { get; set; }
		public string? PhotoUrl { get; set; }
	}
}
