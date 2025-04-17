using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
    public class Country
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
		public string PathToFlag { get; set; }
		public double Lat { get; set; }
		public double Lng { get; set; }

		public int LevelOfDevelopment { get; set; }

		[MaxLength(255)]
		public string? MainDescription { get; set; }
		public int RegionId { get; set; }

        [ForeignKey(nameof(RegionId))]
        public Region Region { get; set; }
        public ICollection<City> Cities { get; set; }
    }
}
