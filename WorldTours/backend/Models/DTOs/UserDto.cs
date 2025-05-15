using System.ComponentModel.DataAnnotations;
using backend.Models.Entity;

namespace backend.Models.DTOs
{
    public class UserDto
	{
		public int Id { get; set; }
		public string? Email { get; set; }
		public UserRole Role { get; set; }
		public bool BlockedStatus { get; set; } = false;

		public string? Name { get; set; }

		public string? Surname { get; set; }

		public string? PhoneNumber { get; set; }

		public string? PhotoUrl { get; set; }

		public int NumberOfUnpaidBooking { get; set; } = 0;
	}
}
