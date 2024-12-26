namespace backend.Models.DTOs
{
	public enum DescriptionFilterValue
	{
		noPreference,
		yes,
		no
	}
	public class DescriptionForFilterDto
	{
		public int CharacteristicId { get; set; }
		public string? CharacteristicName { get; set; }
		public int Value { get; set; }
	}
}
