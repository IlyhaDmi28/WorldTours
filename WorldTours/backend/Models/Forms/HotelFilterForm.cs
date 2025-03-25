using backend.Models.DTOs;

namespace backend.Models.Forms
{
	public class HotelFilterForm
	{
		public int? RegionId { get; set; }
		public int? CountryId { get; set; }
		public int? CityId { get; set; }
		public int? MinStarsNumber { get; set; }
		public int? MaxStarsNumber { get; set; }
	}
}
