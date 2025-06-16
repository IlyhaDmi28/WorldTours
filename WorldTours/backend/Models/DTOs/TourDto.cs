namespace backend.Models.DTOs
{
	public class TourDto
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public List<string> PhotosUrls { get; set; }
		public string? MainDescription { get; set; }
		public HotelForTourDto Hotel { get; set; }
		public List<string> Landmarks { get; set; }
		public List<RouteDto> Routes { get; set; }
		public List<CharacteristicDto> Characteristics { get; set; }
	}
}
