﻿namespace backend.Models.Forms
{
	public class UserForm
	{
		public int Id { get; set; }
		public string Email { get; set; }
		public string Name { get; set; }
		public string Surname { get; set; }
		public string PhoneNumber { get; set; }
		public IFormFile? PhotoFile { get; set; }
	}
}
