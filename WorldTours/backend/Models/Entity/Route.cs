using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
    public class Route
    {
        [Key]
        public int Id { get; set; }
        public DateTime? LandingDateAndTimeOfDeparture { get; set; }
        public DateTime? ArrivalDateAndTimeOfDeparture { get; set; }
        public DateTime? LandingDateAndTimeOfReturn { get; set; }
        public DateTime? ArrivalDateAndTimeOfReturn { get; set; }
        public int? Price { get; set; }
        public int? SeatsNumber { get; set; }
        public int? DepartmentDepartureId { get; set; }
        public int? TourId { get; set; }

        [ForeignKey(nameof(DepartmentDepartureId))]
        public DepartmentDeparture DepartmentDeparture { get; set; }

        [ForeignKey(nameof(TourId))]
        public Tour Tour { get; set; }
		public ICollection<Booking> Bookings { get; set; }

	}
}
