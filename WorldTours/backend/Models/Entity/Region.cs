﻿using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
    public class Region
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
		public string PathToImage { get; set; }
		public ICollection<Country> Countries { get; set; }

	}
}
