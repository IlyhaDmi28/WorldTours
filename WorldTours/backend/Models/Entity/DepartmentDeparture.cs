using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
    public class DepartmentDeparture
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

		[MaxLength(255)]
		public string Address { get; set; }
		public double Lat { get; set; }
		public double Lng { get; set; }
		public int CityId { get; set; }

        [ForeignKey(nameof(CityId))]

        public int TransportTypeId { get; set; }

        [ForeignKey(nameof(TransportTypeId))]
        public City City { get; set; }
        public TransportType TransportType { get; set; }
		public ICollection<Route> Routes { get; set; }
	}
}
