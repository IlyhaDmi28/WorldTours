using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class NutritionType
    {
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(255)]
		public string Name { get; set; }

		public ICollection<Tour> Tours { get; set; }
	}
}
