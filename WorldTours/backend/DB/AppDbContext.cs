using Microsoft.EntityFrameworkCore;
using System.Reflection.PortableExecutable;
using System.Data;
using backend.Models.Entity;

namespace backend.DB
{
    public class AppDbContext : DbContext
    {
		public DbSet<User> Users { get; set; }
		public DbSet<TourType> TourTypes { get; set; }
		public DbSet<CharacteristicType> CharacteristicTypes { get; set; }
		public DbSet<Characteristic> Characteristics { get; set; }
		public DbSet<Description> Descriptions { get; set; }
		public DbSet<Region> Regions { get; set; }
		public DbSet<Country> Countries { get; set; }
		public DbSet<City> Cities { get; set; }
		public DbSet<DepartmentDeparture> DepartmentDepartures { get; set; }
		public DbSet<TransportType> TransportTypes { get; set; }
		public DbSet<Hotel> Hotels { get; set; }
		public DbSet<NutritionType> NutritionTypes { get; set; }
		public DbSet<Tour> Tours { get; set; }
		public DbSet<Models.Entity.Route> Routes { get; set; }
		public DbSet<Booking> Bookings { get; set; }
		public DbSet<Review> Reviews { get; set; }
		public DbSet<HotelCharacteristic> HotelCharacteristics { get; set; }
		public DbSet<RoomType> RoomTypes { get; set; }
		public DbSet<RoomTypeCharacteristic> RoomTypeCharacteristics { get; set; }

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

			modelBuilder.Entity<Hotel>()
				.HasMany(h => h.Characteristics)
				.WithMany(hc => hc.Hotels)
				.UsingEntity<Dictionary<string, object>>(
					"HotelDescriptions", // Название промежуточной таблицы
					j => j
						.HasOne<HotelCharacteristic>()
						.WithMany()
						.HasForeignKey("CharacteristicID")
						.HasConstraintName("FK_HotelDescriptions_HotelCharacteristics"),
					j => j
						.HasOne<Hotel>()
						.WithMany()
						.HasForeignKey("HotelID")
						.HasConstraintName("FK_HotelDescriptions_Hotels")
				);

			modelBuilder.Entity<RoomType>()
				.HasMany(rt => rt.Characteristics)
				.WithMany(rtc => rtc.RoomTypes)
				.UsingEntity<Dictionary<string, object>>(
					"RoomTypeDescriptions", // Название промежуточной таблицы
					j => j
						.HasOne<RoomTypeCharacteristic>()
						.WithMany()
						.HasForeignKey("CharacteristicID")
						.HasConstraintName("FK_RoomTypeDescriptions_RoomTypeCharacteristics"),
					j => j
						.HasOne<RoomType>()
						.WithMany()
						.HasForeignKey("RoomTypeID")
						.HasConstraintName("FK_RoomTypeDescriptions_RoomTypes")
				);


			// Настройка User
			modelBuilder.Entity<User>()
				.HasIndex(u => u.Email)
				.IsUnique();

			// Настройка TourType
			modelBuilder.Entity<TourType>()
				.HasMany(tt => tt.Tours)
				.WithOne(t => t.TourType)
				.HasForeignKey(t => t.TourTypeId)
				.OnDelete(DeleteBehavior.SetNull);


			modelBuilder.Entity<CharacteristicType>()
			.HasMany(ct => ct.Characteristics)
			.WithOne(c => c.CharacteristicType)
			.HasForeignKey(c => c.CharacteristicTypeId)
			.OnDelete(DeleteBehavior.Cascade);

			// Настройка Characteristic
			modelBuilder.Entity<Characteristic>()
				.HasMany(c => c.Descriptions)
				.WithOne(d => d.Characteristic)
				.HasForeignKey(d => d.CharacteristicId)
				.OnDelete(DeleteBehavior.Cascade);

			// Настройка Description
			modelBuilder.Entity<Description>()
				.HasOne(d => d.Tour)
				.WithMany(t => t.Descriptions)
				.HasForeignKey(d => d.TourId)
				.OnDelete(DeleteBehavior.Cascade);

			// Настройка Region
			modelBuilder.Entity<Region>()
				.HasMany(r => r.Countries)
				.WithOne(c => c.Region)
				.HasForeignKey(c => c.RegionId)
				.OnDelete(DeleteBehavior.Cascade);

			// Настройка Country
			modelBuilder.Entity<Country>()
				.HasMany(c => c.Cities)
				.WithOne(city => city.Country)
				.HasForeignKey(city => city.CountryId)
				.OnDelete(DeleteBehavior.Cascade);

			// Настройка City
			modelBuilder.Entity<City>()
				.HasMany(city => city.DepartmentDepartures)
				.WithOne(dd => dd.City)
				.HasForeignKey(dd => dd.CityId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<City>()
				.HasMany(city => city.Hotels)
				.WithOne(h => h.City)
				.HasForeignKey(h => h.CityId)
				.OnDelete(DeleteBehavior.Cascade);

			// Настройка DepartmentDeparture
			modelBuilder.Entity<DepartmentDeparture>()
				.HasMany(dd => dd.Routes)
				.WithOne(r => r.DepartmentDeparture)
				.HasForeignKey(r => r.DepartmentDepartureId)
				.OnDelete(DeleteBehavior.Restrict);

			// Настройка TransportType
			modelBuilder.Entity<TransportType>()
				.HasMany(tt => tt.Routes)
				.WithOne(r => r.TransportType)
				.HasForeignKey(r => r.TransportTypeId)
				.OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<TransportType>()
				.HasMany(tt => tt.DepartmentDepartures)
				.WithOne(dd => dd.TransportType)
				.HasForeignKey(dd =>dd.TransportTypeId)
				.OnDelete(DeleteBehavior.Restrict);

			// Настройка Hotel
			modelBuilder.Entity<Hotel>()
				.HasMany(h => h.Tours)
				.WithOne(t => t.Hotel)
				.HasForeignKey(t => t.HotelId)
				.OnDelete(DeleteBehavior.SetNull);

			// Настройка Tour
			modelBuilder.Entity<Hotel>()
				.HasMany(h => h.RoomTypes)
				.WithOne(rt => rt.Hotel)
				.HasForeignKey(rt => rt.HotelId)
				.OnDelete(DeleteBehavior.Cascade);


			// Настройка NutritionType
			modelBuilder.Entity<NutritionType>()
				.HasMany(nt => nt.Tours)
				.WithOne(t => t.NutritionType)
				.HasForeignKey(t => t.NutritionTypeId)
				.OnDelete(DeleteBehavior.SetNull);

			// Настройка NutritionType
			modelBuilder.Entity<NutritionType>()
				.HasMany(nt => nt.Hotels)
				.WithOne(h => h.NutritionType)
				.HasForeignKey(t => t.NutritionTypeId)
				.OnDelete(DeleteBehavior.SetNull);

			// Настройка Tour
			modelBuilder.Entity<Tour>()
				.HasMany(t => t.Routes)
				.WithOne(r => r.Tour)
				.HasForeignKey(r => r.TourId)
				.OnDelete(DeleteBehavior.Cascade);

			// Настройка Tour
			modelBuilder.Entity<Tour>()
				.HasMany(t => t.Routes)
				.WithOne(r => r.Tour)
				.HasForeignKey(r => r.TourId)
				.OnDelete(DeleteBehavior.Cascade);

			// Настройка Tour
			modelBuilder.Entity<Tour>()
				.HasMany(t => t.Reviews)
				.WithOne(r => r.Tour)
				.HasForeignKey(r => r.TourId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<User>()
				.HasMany(u => u.Bookings)
				.WithOne(b => b.User)
				.HasForeignKey(b => b.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<User>()
				.HasMany(u => u.Reviews)
				.WithOne(r => r.User)
				.HasForeignKey(r => r.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Models.Entity.Route>()
				.HasMany(r => r.Bookings)
				.WithOne(b => b.Route)
				.HasForeignKey(b => b.RouteId)
				.OnDelete(DeleteBehavior.Cascade);

			// Настройка Route
			modelBuilder.Entity<Models.Entity.Route>()
				.Property(r => r.Price)
				.HasDefaultValue(0);

			modelBuilder.Entity<Models.Entity.Route>()
				.Property(r => r.SeatsNumber)
				.HasDefaultValue(0);

			// Индексы и уникальные ограничения
			modelBuilder.Entity<Region>().HasIndex(r => r.Name).IsUnique();
			modelBuilder.Entity<Country>().HasIndex(c => c.Name).IsUnique();
			modelBuilder.Entity<City>().HasIndex(c => c.Name).IsUnique();
			modelBuilder.Entity<DepartmentDeparture>().HasIndex(dd => dd.Name).IsUnique();
			modelBuilder.Entity<Hotel>().HasIndex(h => h.Name).IsUnique();
			modelBuilder.Entity<HotelCharacteristic>().HasIndex(hc => hc.Name).IsUnique();
			modelBuilder.Entity<NutritionType>().HasIndex(nt => nt.Name).IsUnique();
			modelBuilder.Entity<TourType>().HasIndex(tt => tt.Name).IsUnique();
			modelBuilder.Entity<Characteristic>().HasIndex(c => c.Name).IsUnique();
			modelBuilder.Entity<Tour>().HasIndex(t => t.Name).IsUnique();
		}
	}
}
