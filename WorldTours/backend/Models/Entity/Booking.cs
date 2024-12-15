using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
	public class Booking
	{
		[Key]
		public int Id { get; set; }
		public int? OrderSeatsNumber { get; set; }
		public int? RouteId { get; set; }
		public int? UserId { get; set; }

		[ForeignKey(nameof(RouteId))]
		public Route Route { get; set; }

		[ForeignKey(nameof(UserId))]
		public User User { get; set; }
	}
}
