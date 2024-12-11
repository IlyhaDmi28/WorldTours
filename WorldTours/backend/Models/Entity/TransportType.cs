using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
    public class TransportType
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        public ICollection<Route> Routes { get; set; }
    }
}
