﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
	public class Landmark
	{
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(255)]
		public string Name { get; set; }
		public int CityId { get; set; }

		[ForeignKey(nameof(CityId))]
		public City City { get; set; }
	}
}
