namespace backend.Models
{
	public class Characteristic
	{
		public int Id { get; set; }
		public string Name { get; set; }

		// Внешний ключ
		public int CharacteristicTypeId { get; set; }

		// Навигационное свойство для связи "многие к одному"
		public CharacteristicType CharacteristicType { get; set; }

		public ICollection<Description> Descriptions { get; set; }

		// Навигационное свойство для связи многие-ко-многим
		public ICollection<TourType> TourTypes { get; set; }
	}	
}
