using backend.Models.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
	public class HotelForEditCardDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Country { get; set; }
		public string City { get; set; }
		public string Address { get; set; }
		public int StarsNumber { get; set; }

		public string PhotoUrl { get; set; }
	}
}
