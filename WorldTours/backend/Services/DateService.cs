using System.Globalization;

namespace backend.Services
{
	public class DateService
	{
		public static DateTime ConvertToDateFormat(string inputDate, string[] inputFormats = null)
		{
			// Если входные форматы не заданы, используем стандартные
			inputFormats ??= new[] { "yyyy-MM-dd", "dd.MM.yyyy", "MM/dd/yyyy", "yyyy/MM/dd" };

			if (DateTime.TryParseExact(inputDate, inputFormats, CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDate))
			{
				return parsedDate;
			}

			throw new FormatException($"Неверный формат даты: {inputDate}. Допустимые форматы: {string.Join(", ", inputFormats)}.");
		}
	}
}
