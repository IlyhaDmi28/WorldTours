using backend.Models.DTOs;

namespace backend.Models.Forms
{
	public class Filter
	{
		public int? RegionId { get; set; }
		public int? CountryId { get; set; }
		public int? CityId { get; set; }
		public int? DepartureCityId { get; set; }
		public DateTime? DateOfDeparture { get; set; }
		public DateTime? DateOfReturn { get; set; }
		public int? TransportTypeId { get; set; }
		public int? TourTypeId { get; set; }
		public int? MinPrice { get; set; }
		public int? MaxPrice { get; set; }
		public int? MinHotelStars { get; set; }
		public int? MaxHotelStars { get; set; }
		public int? NutritionTypeId { get; set; }
		public List<DescriptionForFilterDto> Descriptions { get; set; }
		
	}
}
