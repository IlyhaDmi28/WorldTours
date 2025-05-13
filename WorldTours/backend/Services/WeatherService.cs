using backend.Models.Entity;

namespace backend.Services
{
	public interface IWeatherService
	{
		bool IsWeatherAppropriate(City city, int season, int whether);
	}
	public class WeatherService : IWeatherService
	{
		private List<int>[,] whethers { get; set; } =
		{
			//Лето				//Осень				//Зима			  //Весна
			{new List<int>{1 }, new List<int>{1 }, new List<int>{1 }, new List<int>{1 }, }, //Экваториальный
			{new List<int>{1 }, new List<int>{1 }, new List<int>{1, 2 }, new List<int>{1 }, },  //Субэкваториальный
			{new List<int>{1 }, new List<int>{1, 2 }, new List<int>{2, 3}, new List<int>{1, 2 }, },  //Тропический
			{new List<int>{1 }, new List<int>{2, 3 }, new List<int>{ 3 }, new List<int>{2, 3 }, }, //Субтропический
			{new List<int>{1, 2 }, new List<int>{3}, new List<int>{3, 4 }, new List<int>{3 }, }, //Умеренный
			{new List<int>{2, 3 }, new List<int>{3, 4 }, new List<int>{4 }, new List<int>{3, 4}, }, //Субарктический
			{new List<int>{2, 3 }, new List<int>{3, 4}, new List<int>{3, 4 }, new List<int>{3, 4 }, }, //Горный
		};

		public bool IsWeatherAppropriate(City city, int season, int whether) 
		{
			if(season != 0) return whethers[city.ClimateId - 1, season - 1].Contains(whether);
			else
			{
				foreach (List<int> item in whethers)
				{
					if (item.Contains(whether)) return true;
				}
			}

			return false;
		}
	}
}
