using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
    public class TourCharacteristic
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

		// Навигационное свойство для связи многие-ко-многим
		public ICollection<Tour> Tours { get; set; }
    }
}
