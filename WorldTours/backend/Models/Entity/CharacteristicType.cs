using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
    public class CharacteristicType
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        public ICollection<Characteristic> Characteristics { get; set; }
    }
}
