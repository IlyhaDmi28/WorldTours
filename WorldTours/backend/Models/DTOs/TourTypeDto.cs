namespace backend.Models.DTOs
{
	public class TourTypeDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string ImageUrl { get; set; }
		public List<TourTypeDto> TourTypes { get; set; }
	}
}
