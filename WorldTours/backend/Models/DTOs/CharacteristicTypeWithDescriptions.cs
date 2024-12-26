namespace backend.Models.DTOs
{
	public class CharacteristicTypeWithDescriptions
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public List<DescriptionWithCharacteriscDto> Descriptions { get; set; }
	}
}
