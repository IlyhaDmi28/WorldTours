using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
    public class City
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        public int CountryId { get; set; }
        public int ClimateId { get; set; }

		public double Lat { get; set; }
		public double Lng { get; set; }

		[MaxLength(255)]
		public string? MainDescription { get; set; }

        [ForeignKey(nameof(CountryId))]
        public Country Country { get; set; }

		[ForeignKey(nameof(ClimateId))]
		public Climate Climate { get; set; }
		public ICollection<DepartmentDeparture> DepartmentDepartures { get; set; }
        public ICollection<Hotel> Hotels { get; set; }
        public ICollection<Landmark> Landmarks { get; set; }

	}
}
