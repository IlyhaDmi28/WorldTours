using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
	public class RoomType
	{
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(255)]
		public string Name { get; set; }
		public int? Price { get; set; }
		public int? SeatsNumber { get; set; }
		public int? RoomsNumber { get; set; }
		public int HotelId { get; set; }

		[ForeignKey(nameof(HotelId))]
		public Hotel Hotel { get; set; }

		public ICollection<RoomTypeCharacteristic> Characteristics { get; set; }

		public ICollection<BookedRoomType> BookedRoomTypes{ get; set; }

	}
}
