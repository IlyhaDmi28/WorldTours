using backend.Models.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Forms
{
	public class HotelForm
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int CityId { get; set; }
		public string Address { get; set; }
		public double? Lat { get; set; }
		public double? Lng { get; set; }
		public int StarsNumber { get; set; }
		public string MainDescription { get; set; }
		public int? NutritionTypeId { get; set; }
		public List<IFormFile> PhotosFiles { get; set; }
		public string Characteristics { get; set; }
		public string RoomTypes { get; set; }
	}
}
