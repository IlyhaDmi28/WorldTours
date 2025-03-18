namespace backend.Models.Forms
{
	public class TourForm
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? MainDescription { get; set; }
		public int? TourTypeId { get; set; }
		public int? HotelId { get; set; }
		public List<IFormFile> PhotosFiles { get; set; }
		public string Characteristics { get; set; }
		public string Routes { get; set; }
	}
}
