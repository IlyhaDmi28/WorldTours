namespace backend.Models
{
	public class Country
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public byte[] Flag { get; set; }
		public int RegionId { get; set; }
		public Region Region { get; set; }
		public ICollection<City> Cities { get; set; }
	}
}
