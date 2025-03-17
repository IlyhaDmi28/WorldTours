using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
    public class Hotel
    {
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(255)]
		public string Name { get; set; }
		public int CityId { get; set; }

		[MaxLength(255)]
		public string Address { get; set; }
		public int StarsNumber { get; set; }

		[MaxLength(255)]
		public string MainDescription { get; set; }
		public int? NutritionTypeId { get; set; }

		[ForeignKey(nameof(NutritionTypeId))]
		public NutritionType NutritionType { get; set; }

		[ForeignKey(nameof(CityId))]
		public City City { get; set; }
		public ICollection<Tour> Tours { get; set; }
		public ICollection<HotelCharacteristic> Characteristics { get; set; }
		public ICollection<RoomType> RoomTypes { get; set; }
	}
}
