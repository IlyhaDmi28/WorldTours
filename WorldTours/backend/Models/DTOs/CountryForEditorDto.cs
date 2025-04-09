namespace backend.Models.DTOs
{
	public class CountryForEditorDto
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? FlagUrl { get; set; }
		public string? MainDescription { get; set; }
		public double? Lat { get; set; }
		public double? Lng { get; set; }
		public List<CityDto> Cities { get; set; }
	}
}
