using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
    public class Description
    {
        [Key]
        public int Id { get; set; }
        public bool Value { get; set; }
        public int CharacteristicId { get; set; }
        public int TourId { get; set; }

        [ForeignKey(nameof(CharacteristicId))]
        public Characteristic Characteristic { get; set; }
        [ForeignKey(nameof(TourId))]
        public Tour Tour { get; set; }

    }
}
