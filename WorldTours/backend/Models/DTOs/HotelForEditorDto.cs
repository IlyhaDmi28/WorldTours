using backend.Models.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
	public class HotelForEditorDto
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public int? CityId { get; set; }

		public string? Address { get; set; }

		public double? Lat { get; set; }
		public double? Lng { get; set; }
		public int? StarsNumber { get; set; }

		public string? MainDescription { get; set; }
		public int? NutritionTypeId { get; set; }
		public List<string> PhotosUrls { get; set; }
		public List<CharacteristicDto> Characteristics { get; set; }
		public List<RoomTypeDto> RoomTypes { get; set; }
	}
}
