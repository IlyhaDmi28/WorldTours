namespace backend.Models
{
	public class Description
	{
		public int Id { get; set; }
		public string Value { get; set; }
		public int CharacteristicId { get; set; }
		public int TourId { get; set; }
		public Characteristic Characteristic { get; set; }

	}
}
