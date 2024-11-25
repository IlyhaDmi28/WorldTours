using System.Reflection.PortableExecutable;

namespace backend.Models
{
	public class CharcteristicType
	{
		public int Id { get; set; }
		public string Name { get; set; }

		// Навигационное свойство для связи "один ко многим"
		public ICollection<Charcteristic> Charcteristics { get; set; }
	}
}
