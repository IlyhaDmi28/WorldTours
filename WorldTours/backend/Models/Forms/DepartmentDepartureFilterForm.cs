using backend.Models.DTOs;

namespace backend.Models.Forms
{
	public class DepartmentDepartureFilterForm
	{
		public int? RegionId { get; set; }
		public int? CountryId { get; set; }
		public int? CityId { get; set; }
		public int? TransportTypeId { get; set; }
	}
}
