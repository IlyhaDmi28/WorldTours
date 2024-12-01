namespace backend.Models.DTOs
{
	public class TourTypeWithCharacteristics
	{
		public TourTypeDto TourType { get; set; }
		public List<Characteristic> Characteristics { get; set; }
	}
}
