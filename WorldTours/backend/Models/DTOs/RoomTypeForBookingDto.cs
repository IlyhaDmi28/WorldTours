namespace backend.Models.DTOs
{
	public class RoomTypeForBookingDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int? Price { get; set; }
		public int? SeatsNumber { get; set; }
		public int? OrderRoomsNumber { get; set; }
		public List<CharacteristicDto> Characteristics { get; set; }
	}
}
