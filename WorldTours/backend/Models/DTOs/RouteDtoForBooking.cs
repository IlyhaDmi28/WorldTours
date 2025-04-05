using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
	public class RouteForBookingDto
	{
		public int Id { get; set; }
		//public string? LandingDateOfDeparture { get; set; }
		//public string? LandingTimeOfDeparture { get; set; }
		//public string? ArrivalDateOfDeparture { get; set; }
		//public string? ArrivalTimeOfDeparture { get; set; }
		//public string? LandingDateOfReturn { get; set; }
		//public string? LandingTimeOfReturn { get; set; }
		//public string? ArrivalDateOfReturn { get; set; }
		//public string? ArrivalTimeOfReturn { get; set; }
		public string? LandingDateAndTimeOfDeparture { get; set; }
		public string? ArrivalDateAndTimeOfDeparture { get; set; }
		public string? LandingDateAndTimeOfReturn { get; set; }
		public string? ArrivalDateAndTimeOfReturn { get; set; }
		public DepartmentDepartureDto DepartmentDeparture { get; set; }
		public string TranportTypeName { get; set; }
	}
}
