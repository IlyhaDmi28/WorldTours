using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Forms
{
	public class RouteForm
	{
		public int Id { get; set; }
		public string? LandingDateAndTimeOfDeparture { get; set; }
		public string? ArrivalDateAndTimeOfDeparture { get; set; }
		public string? LandingDateAndTimeOfReturn { get; set; }
		public string? ArrivalDateAndTimeOfReturn { get; set; }
		public int? Price { get; set; }
		public int? SeatsNumber { get; set; }
		public int DepartmentDepartureId { get; set; }
	}
}
