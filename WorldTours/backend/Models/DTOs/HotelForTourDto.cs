namespace backend.Models.DTOs
{
	public class HotelForTourDto
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? City { get; set; }
		public string? Country { get; set; }

		public string? Address { get; set; }
		public int? StarsNumber { get; set; }

		public string? NutritionType { get; set; }
		public List<CharacteristicDto> Characteristics { get; set; }
		public List<RoomTypeDto> RoomTypes { get; set; }
	}
}
