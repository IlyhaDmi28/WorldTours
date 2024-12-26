namespace backend.Models.DTOs
{
	public class TourForm
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? MainDescription { get; set; }
		public int? TourTypeId { get; set; }
		public int? NutritionTypeId { get; set; }
		public int? HotelId { get; set; }
		public IFormFile? PhotoFile { get; set; }
		public List<RouteDto> Routes { get; set; }
		public List<DescriptionWithCharacteriscDto> Descriptions { get; set; }

	}
}
