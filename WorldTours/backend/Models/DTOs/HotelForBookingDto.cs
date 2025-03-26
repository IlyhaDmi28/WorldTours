namespace backend.Models.DTOs
{
	public class HotelForBookingDto
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? City { get; set; }
		public string? Country { get; set; }

		public string? Address { get; set; }
		public double? Lat { get; set; }
		public double? Lng { get; set; }
		public int? StarsNumber { get; set; }

		public List<RoomTypeForBookingDto> RoomTypes { get; set; }
	}
}
