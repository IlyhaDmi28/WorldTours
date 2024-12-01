using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
	public class Tour
	{
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(255)]
		public string Name { get; set; }
		[MaxLength(255)]
		public string MainDescription { get; set; }
		public int? TourTypeId { get; set; }
		public int? NutritionTypeId { get; set; }
		public int? HotelId { get; set; }
		public byte[]? Photo { get; set; }

		[ForeignKey(nameof(TourTypeId))]
		public TourType TourType { get; set; }
		[ForeignKey(nameof(NutritionTypeId))]
		public NutritionType NutritionType { get; set; }
		[ForeignKey(nameof(HotelId))]
		public Hotel Hotel { get; set; }
		public ICollection<Route> Routes { get; set; }
		public ICollection<Description> Descriptions { get; set; }
	}
}
