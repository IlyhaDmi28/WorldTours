using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.DB
{
    public class AppDbContext : DbContext
    {
        public DbSet<UserModel> Users { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }
    }
}
