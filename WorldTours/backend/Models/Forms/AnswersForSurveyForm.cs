namespace backend.Models.Forms
{
	public class AnswersForSurveyForm
	{
		public int Season { get; set; }
		public int TourType { get; set; }
		public int Weather { get; set; }
		public string Biom { get; set; }
		public string Elevation { get; set; }
		public string Water { get; set; }
		public string Buildings { get; set; }
		public int LevelOfDevelopment { get; set; } 
	}
}