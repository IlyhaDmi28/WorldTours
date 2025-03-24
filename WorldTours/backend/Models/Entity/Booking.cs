using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
	public class Booking
	{
		[Key]
		public int Id { get; set; }
		public int? OrderSeatsNumber { get; set; }
		public int? Price { get; set; }
		public int? RouteId { get; set; }
		public int? UserId { get; set; }
		public int? Status { get; set; }
		public string? Comment { get; set; }

		public bool? PrioritySeatsInTransport { get; set; }
		public bool? HasСhildren { get; set; }

		[ForeignKey(nameof(RouteId))]
		public Route Route { get; set; }

		[ForeignKey(nameof(UserId))]
		public User User { get; set; }
		public ICollection<BookedRoomType> BookedRoomTypes { get; set; }

	}
}
