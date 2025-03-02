using backend.Models.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Forms
{
	public class RoomTypeForm
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int? Price { get; set; }
		public int? SeatsNumber { get; set; }
		public int? RoomsNumber { get; set; }

		public List<CharacteristicForm> Characteristics { get; set; }
	}
}
