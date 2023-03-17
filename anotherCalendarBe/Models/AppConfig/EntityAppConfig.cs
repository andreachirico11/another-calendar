using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace anotherCalendarBe.Models;

public class EntityAppConfig : IEntityTypeConfiguration<AppConfig>
{
    public void Configure(EntityTypeBuilder<AppConfig> builder)
    {
        var version = new AppConfig { version = "0.0.1", _id = Guid.NewGuid() };
        builder.ToTable("AppConfig");
        builder.HasKey(config => config._id);
        builder.HasData(version);
    }
}

