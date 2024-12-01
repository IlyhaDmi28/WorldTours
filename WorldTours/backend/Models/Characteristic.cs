using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
	public class Characteristic
	{
		[Key]
		public int Id { get; set; }
		public int CharacteristicTypeId { get; set; }
		[Required]
		[MaxLength(255)]
		public string Name { get; set; }

		public ICollection<Description> Descriptions { get; set; }
		// Навигационное свойство для связи многие-ко-многим
		public ICollection<TourType> TourTypes { get; set; }
	}	
}
