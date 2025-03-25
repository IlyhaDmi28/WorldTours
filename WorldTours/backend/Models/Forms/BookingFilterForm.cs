namespace backend.Models.Forms
{
	public class BookingFilterForm
	{
		public int? RegionId { get; set; }
		public int? CountryId { get; set; }
		public int? CityId { get; set; }
		public int? BookingStatus { get; set; }
		public string? MinLandingDateOfDeparture { get; set; }
		public string? MinArrivalDateOfDeparture { get; set; }
		public string? MinLandingDateOfReturn { get; set; }
		public string? MinArrivalDateOfReturn { get; set; }
		public string? MaxLandingDateOfDeparture { get; set; }
		public string? MaxArrivalDateOfDeparture { get; set; }
		public string? MaxLandingDateOfReturn { get; set; }
		public string? MaxArrivalDateOfReturn { get; set; }
		public int? DepartmentDepartureId { get; set; }

	}
}
