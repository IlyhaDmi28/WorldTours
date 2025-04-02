namespace backend.Models.Forms
{
	public class RequestForBookingForm
	{
		public int? OrderSeatsNumber { get; set; }
		public int? RouteId { get; set; }
		public int? UserId { get; set; }
		public bool? HasChildren { get; set; }
		public int? Price { get; set; }
		public bool? PrioritySeatsInTransport { get; set; }
		public string? Comment { get; set; }
		public List<BookedRoomTypeForm> BookedRoomTypes { get; set; }
	}
}
