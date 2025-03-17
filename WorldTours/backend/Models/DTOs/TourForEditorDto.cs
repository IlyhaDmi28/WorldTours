namespace backend.Models.DTOs
{
	public class TourForEditorDto
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? MainDescription { get; set; }
		public int? TourTypeId { get; set; }
		public int? HotelId { get; set; }
		public List<string> PhotosUrls { get; set; }
		public List<RouteDto> Routes { get; set; }
		public List<CharacteristicDto> Characteristics { get; set; }
	}
}
