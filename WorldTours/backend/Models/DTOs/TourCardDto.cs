namespace backend.Models.DTOs
{
	public class TourCardDto
	{
		public int Id { get; set; }
		public int RouteId { get; set; }
		public string? Name { get; set; }
		public string? Country { get; set; }
		public string? City { get; set; }
		public int? StarsNumber { get; set; }
		public string? PhotoUrl { get; set; }
		public string? DateOfDeparture { get; set; }
		public string? DateOfReturn { get; set; }
		public string? TourTypeImageUrl { get; set; }

		public int? Price { get; set; }	
	}
}
