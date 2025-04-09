namespace backend.Models.DTOs
{
	public class CityForEditorDto
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? MainDescription { get; set; }
		public double? Lat { get; set; }
		public double? Lng { get; set; }
	}
}
