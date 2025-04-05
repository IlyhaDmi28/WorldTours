using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
	public class RouteDto
	{
		public int Id { get; set; }
		public string? LandingDateAndTimeOfDeparture { get; set; }
		public string? ArrivalDateAndTimeOfDeparture { get; set; }
		public string? LandingDateAndTimeOfReturn { get; set; }
		public string? ArrivalDateAndTimeOfReturn { get; set; }
		public int? Price { get; set; }
		public int? SeatsNumber { get; set; }
		public DepartmentDepartureDto DepartmentDeparture { get; set; }
		public TransportTypeDto TransportType { get; set; }
	}
}
