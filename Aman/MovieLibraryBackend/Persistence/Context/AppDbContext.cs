using Microsoft.EntityFrameworkCore;
using MovieLibraryApi.Persistence.Entities;

namespace MovieLibraryApi.Persistence.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)    { }

    public DbSet<ReviewMovie> ReviewMovie { get; set; }
    public DbSet<ReviewTvSeries> ReviewTvSeries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ReviewMovie>(entity =>
        {
            entity.Property(r => r.CreatedDate)
            .ValueGeneratedOnAdd()
            .HasDefaultValueSql("GetUTCDate()");
        });

        modelBuilder.Entity<ReviewTvSeries>(entity =>
        {
            entity.Property(r => r.CreatedDate)
            .ValueGeneratedOnAdd()
            .HasDefaultValueSql("GetUTCDate()");
        });
    }
}
