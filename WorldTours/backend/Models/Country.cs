using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
	public class Country
	{
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(255)]
		public string Name { get; set; }
		public byte[]? Flag { get; set; }
		public int RegionId { get; set; }

		[ForeignKey(nameof(RegionId))]
		public Region Region { get; set; }
		public ICollection<City> Cities { get; set; }
	}
}
