namespace backend.Models.DTOs
{
	public class CityForCountryDto
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? MainDescription { get; set; }
		public double? Lat { get; set; }
		public double? Lng { get; set; }
		public string Climate { get; set; }
		public string Country { get; set; }

		public List<string> Landmarks { get; set; }
	}
}
