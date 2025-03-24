namespace backend.Models.DTOs
{
	public class BookingDto
	{
		public int Id { get; set; }
		public int TourId { get; set; }
		public int RouteId { get; set; }
		public string? TourName { get; set; }
		public string? TourPhotoUrl { get; set; }
		public int? Price { get; set; }
		public int? OrderSeatsNumber { get; set; }
		public int? Status { get; set; }
		public bool? HasChildren { get; set; }
		public bool? PrioritySeatsInTransport { get; set; }
		public string? Comment { get; set; }
		public RouteForBookingDto Route { get; set; }
		public HotelForBookingDto Hotel { get; set; }

	}
}
