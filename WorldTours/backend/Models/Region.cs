namespace backend.Models
{
	public class Region
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public byte[] Image { get; set; }

		public ICollection<Country> Countries { get; set; }
	}
}
