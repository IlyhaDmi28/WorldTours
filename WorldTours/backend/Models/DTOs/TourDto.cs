namespace backend.Models.DTOs
{
	public class TourDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string MainDescription { get; set; }
		public int? TourTypeId { get; set; }
		public int? NutritionTypeId { get; set; }
		public int? HotelId { get; set; }
		public byte[]? Photo { get; set; }
		public List<Route> Routes { get; set; }
		public List<DescriptionWithCharacteriscDto> Descriptions { get; set; }
	}
}
