using Microsoft.EntityFrameworkCore;
using anotherCalendarBe.Models;
using anotherCalendarBe.utils;

namespace anotherCalendarBe
{
    public partial class AnotherCDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        {
            optionsBuilder.UseMySQL(Envs.dbConnString);
        }

        public DbSet<AppConfig> AppConfig { get; set; }
        public DbSet<CalendarEvent> CalendarEvent { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}