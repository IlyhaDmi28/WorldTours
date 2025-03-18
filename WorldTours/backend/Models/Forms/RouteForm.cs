using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Forms
{
	public class RouteForm
	{
		public int Id { get; set; }
		public string? LandingDateOfDeparture { get; set; }
		public string? LandingTimeOfDeparture { get; set; }
		public string? ArrivalDateOfDeparture { get; set; }
		public string? ArrivalTimeOfDeparture { get; set; }
		public string? LandingDateOfReturn { get; set; }
		public string? LandingTimeOfReturn { get; set; }
		public string? ArrivalDateOfReturn { get; set; }
		public string? ArrivalTimeOfReturn { get; set; }
		public int? Price { get; set; }
		public int? SeatsNumber { get; set; }
		public int DepartmentDepartureId { get; set; }
	}
}
