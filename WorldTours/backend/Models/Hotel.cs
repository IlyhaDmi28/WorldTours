namespace backend.Models
{
	public class Hotel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int StarsNumber { get; set; }
		public int CityId { get; set; }
		public City City { get; set; }
	}
}
