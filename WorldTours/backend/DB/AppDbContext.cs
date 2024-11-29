using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Reflection.PortableExecutable;

namespace backend.DB
{
    public class AppDbContext : DbContext
    {
		public DbSet<CharacteristicType> CharacteristicTypes { get; set; }
		public DbSet<Characteristic> Characteristics { get; set; }
		public DbSet<User> Users { get; set; }
        public DbSet<TourType> TourTypes { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<DepartmentDeparture> DepartmentDepartures { get; set; }
        public DbSet<TransportType> TransportTypes { get; set; }
        public DbSet<NutritionType> NutritionTypes { get; set; }
        public DbSet<Description> Descriptions { get; set; }
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			// Настройка связи многие-ко-многим
			modelBuilder.Entity<TourType>()
				.HasMany(tt => tt.Characteristics)
				.WithMany(c => c.TourTypes)
				.UsingEntity<Dictionary<string, object>>(
					"Charcteristics_TourTypes", // Название промежуточной таблицы
					j => j
						.HasOne<Characteristic>()
						.WithMany()
						.HasForeignKey("CharacteristicID")
						.HasConstraintName("FK_Charcteristics_TourTypes_Characteristics"),
					j => j
						.HasOne<TourType>()
						.WithMany()
						.HasForeignKey("TourTypeID")
						.HasConstraintName("FK_Charcteristics_TourTypes_TourTypes")
				);

			// Связь "один ко многим" между CharcteristicType и Charcteristics
			modelBuilder.Entity<CharacteristicType>()
				.HasMany(ct => ct.Characteristics)
				.WithOne(c => c.CharacteristicType)
				.HasForeignKey(c => c.CharacteristicTypeId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Region>()
				.HasMany(region => region.Countries)
				.WithOne(country => country.Region)
				.HasForeignKey(country => country.RegionId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Country>()
				.HasMany(country => country.Cities)
				.WithOne(city => city.Country)
				.HasForeignKey(city => city.CountryId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<City>()
				.HasMany(city => city.Hotels)
				.WithOne(hotel => hotel.City)
				.HasForeignKey(hotel => hotel.CityId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<City>()
				.HasMany(city => city.DepartmentDepartures)
				.WithOne(departmentDeparture => departmentDeparture.City)
				.HasForeignKey(departmentDeparture => departmentDeparture.CityId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Characteristic>()
				.HasMany(characteristic => characteristic.Descriptions)
				.WithOne(description => description.Characteristic)
				.HasForeignKey(description => description.CharacteristicId)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}
