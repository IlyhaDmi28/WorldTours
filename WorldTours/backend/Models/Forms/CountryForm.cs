using backend.Models.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Forms
{
	public class CountryForm
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public double Lat { get; set; }
		public double Lng { get; set; }
		public int LevelOfDevelopment { get; set; }
		public string? MainDescription { get; set; }
		public int RegionId { get; set; }
		public IFormFile? PhotoFile { get; set; }
		public string? Cities { get; set; }

	}
}
