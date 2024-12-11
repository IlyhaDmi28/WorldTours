using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
    public class Characteristic
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        public int CharacteristicTypeId { get; set; }

        [ForeignKey(nameof(CharacteristicTypeId))]
        public CharacteristicType CharacteristicType { get; set; }

        public ICollection<Description> Descriptions { get; set; }
        // Навигационное свойство для связи многие-ко-многим
        public ICollection<TourType> TourTypes { get; set; }
    }
}
