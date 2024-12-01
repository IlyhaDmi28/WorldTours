using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
	public class Route
	{
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(255)]
		public string Name { get; set; }
		public DateTime? LandingDateOfDeparture { get; set; }
		public TimeSpan? LandingTimeOfDeparture { get; set; }
		public DateTime? ArrivalDateOfDeparture { get; set; }
		public TimeSpan? ArrivalTimeOfDeparture { get; set; }
		public DateTime? LandingDateOfReturn { get; set; }
		public TimeSpan? LandingTimeOfReturn { get; set; }
		public DateTime? ArrivalDateOfReturn { get; set; }
		public TimeSpan? ArrivalTimeOfReturn { get; set; }
		public int Price { get; set; }
		public int SeatsNumber { get; set; }
		public int? DepartmentDepartureId { get; set; }
		public int? TransportTypeId { get; set; }
		public int? TourId { get; set; }

		[ForeignKey(nameof(DepartmentDepartureId))]
		public DepartmentDeparture DepartmentDeparture { get; set; }

		[ForeignKey(nameof(TransportTypeId))]
		public TransportType TransportType { get; set; }

		[ForeignKey(nameof(TourId))]
		public Tour Tour { get; set; }
	}
}
