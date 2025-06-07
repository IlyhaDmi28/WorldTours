using System.Security.Cryptography;
using System.Text;

namespace backend.Services
{
	interface IHashService
	{
		public string ComputeHash(string input);
		public bool VerifyHash(string input, string hash);
	}



	public class HashService
	{
		// Метод для хеширования текста
		public static string ComputeHash(string input)
		{
			using (SHA256 sha256 = SHA256.Create())
			{
				byte[] inputBytes = Encoding.UTF8.GetBytes(input); // Преобразуем текст в байты
				byte[] hashBytes = sha256.ComputeHash(inputBytes); // Вычисляем хеш

				// Конвертируем байты хеша в строку
				StringBuilder sb = new StringBuilder();
				foreach (byte b in hashBytes)
				{
					sb.Append(b.ToString("x2")); // Преобразование в шестнадцатеричный формат
				}
				return sb.ToString();
			}
		}

		// Метод для проверки совпадения
		public static bool VerifyHash(string input, string hash)
		{
			string inputHash = ComputeHash(input); // Хешируем входной текст
			return inputHash.Equals(hash, StringComparison.OrdinalIgnoreCase); // Сравниваем хеши
		}
	}
}
