namespace backend.Models.Forms
{
	public class DepartmentDepartureForm
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Address { get; set; }
		public double? Lat { get; set; }
		public double? Lng { get; set; }
		public int CityId { get; set; }
		public int TransportTypeId { get; set; }
	}
}
