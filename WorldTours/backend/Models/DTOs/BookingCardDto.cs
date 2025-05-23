﻿namespace backend.Models.DTOs
{
	public class BookingCardDto
	{
		public int Id { get; set; }
		public int TourId { get; set; }
		public int RouteId { get; set; }
		public string? TourName { get; set; }
		public string? TourPhotoUrl { get; set; }
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
		public int? Price { get; set; }
		public int? OrderSeatsNumber { get; set; }
		public int? Status { get; set; }

		public DirectionDto Direction { get; set; }
		public DepartmentDepartureDto DepartmentDeparture { get; set; }
	}
}
