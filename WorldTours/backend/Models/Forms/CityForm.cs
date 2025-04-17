namespace backend.Models.Forms
{
	public class CityForm
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? MainDescription { get; set; }
		public double? Lat { get; set; }
		public double? Lng { get; set; }
		public int CountryId { get; set; }
		public int ClimateId { get; set; }
		public List<LandmarkForm> Landmarks { get; set; }
	}
}
