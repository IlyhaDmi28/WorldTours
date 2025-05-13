using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;

namespace backend.Services
{
	public interface IAiService
	{
		Task<string> ConvertPromptToQuery(string prompt);
	}
	public class AiService : IAiService
	{
		private readonly HttpClient _httpClient;
		private const string ApiKey = "AIzaSyCDVTUnLdAt2Zo1gRWs2A8g_uo-0SX6o0g"; // Заменить на свой
		private const string Endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

		public AiService(HttpClient httpClient)
		{
			_httpClient = httpClient;
		}

		public async Task<string> ConvertPromptToQuery(string prompt)
		{
			var request = new
			{
				contents = new[]
				{
					new
					{
						role = "user",
						parts = new[]
						{
							new { text = "Ты — помощник турагентства. Тебе необходимо предлагать список городов, которые подходят под описание (либо описание местности около города). Отвечай по-русски. В ответе должны быть просто города, перечисленные через запятую" }
						}
					},
					new
					{
						role = "user",
						parts = new[]
						{
							new { text = prompt } // То, что ввёл пользователь
						}
					}
				}
			};


			var url = $"{Endpoint}?key={ApiKey}";
			var content = new StringContent(JsonSerializer.Serialize(request), Encoding.UTF8, "application/json");

			var response = await _httpClient.PostAsync(url, content);
			var responseBody = await response.Content.ReadAsStringAsync();

			var doc = JsonDocument.Parse(responseBody);
			var text = doc.RootElement
				.GetProperty("candidates")[0]
				.GetProperty("content")
				.GetProperty("parts")[0]
				.GetProperty("text")
				.GetString();

			return text ?? "Нет ответа.";
		}
	}
}
