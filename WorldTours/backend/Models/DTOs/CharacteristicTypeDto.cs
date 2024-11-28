namespace backend.Models.DTOs
{
	public class CharacteristicTypeDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public List<CharacteristicDto> Characteristics { get; set; }
	}
}
