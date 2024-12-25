using backend.Models.Entity;

namespace backend.Services
{
	public class PhotoService
	{
		public static async Task<byte[]?> ConvertToBytes(IFormFile? photoFile)
		{
			if (photoFile != null)
			{
				using (var memoryStream = new MemoryStream())
				{
					await photoFile.CopyToAsync(memoryStream);
					return memoryStream.ToArray();
				}
			}

			return null;
		}

		public static string? ConvertToBase64(byte[]? photoBytes, string format)
		{
			return photoBytes == null ? null : $"{$"data:image/{format};base64,"}{Convert.ToBase64String(photoBytes)}";
		}
	}
}
