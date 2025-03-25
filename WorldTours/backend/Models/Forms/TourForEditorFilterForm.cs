using backend.Models.DTOs;

namespace backend.Models.Forms
{
	public class TourForEditorFilterForm
	{
		public int? RegionId { get; set; }
		public int? CountryId { get; set; }
		public int? CityId { get; set; }
		public int? TourTypeId { get; set; }
	}
}
