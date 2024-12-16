namespace backend.Models.DTOs
{
	public class BookingCardDto
	{
		public int Id { get; set; }
		public string TourName { get; set; }
		public string TourPhotoUrl { get; set; }
		public string? LandingDateOfDeparture { get; set; }
		public string? LandingTimeOfDeparture { get; set; }
		public string? ArrivalDateOfDeparture { get; set; }
		public string? ArrivalTimeOfDeparture { get; set; }
		public string? LandingDateOfReturn { get; set; }
		public string? LandingTimeOfReturn { get; set; }
		public string? ArrivalDateOfReturn { get; set; }
		public string? ArrivalTimeOfReturn { get; set; }
		public int? Price { get; set; }
		public DirectionDto Direction { get; set; }
		public DepartmentDepartureDto DepartmentDeparture { get; set; }
	}
}
