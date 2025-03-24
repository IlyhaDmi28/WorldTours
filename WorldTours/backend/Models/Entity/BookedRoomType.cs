using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
	public class BookedRoomType
	{
		[Key]
		public int Id { get; set; }
		public int? OrderRoomsNumber { get; set; }
		public int? BookingID { get; set; }
		public int? RoomTypeID { get; set; }

		[ForeignKey(nameof(BookingID))]
		public Booking Booking { get; set; }

		[ForeignKey(nameof(RoomTypeID))]
		public RoomType RoomType { get; set; }
	}
}
