using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
	public class Review
	{
		[Key]
		public int Id { get; set; }
		public int? UserId { get; set; }
		public int? TourId { get; set; }
		public string? ReviewText { get; set; }

		[ForeignKey(nameof(TourId))]
		public Tour Tour { get; set; }

		[ForeignKey(nameof(UserId))]
		public User User { get; set; }
	}
}
