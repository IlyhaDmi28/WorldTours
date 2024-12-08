namespace backend.Models.DTOs
{
	public class TourDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string? PhotoUrl { get; set; }
		public string MainDescription { get; set; }
		public string NutritionType { get; set; }
		public DirectionDto Direction { get; set; }
		public List<RouteDto> Routes { get; set; }
		public List<CharacteristicTypeWithDescriptions> Descriptions { get; set; }
	}
}
