using anotherCalendarBe;
using anotherCalendarBe.utils;
using Microsoft.EntityFrameworkCore;

var production = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production";

var builder = WebApplication.CreateBuilder(args);

Envs.SetupEnvs(production, builder.Configuration.GetRequiredSection("Settings").Get<Settings>());

builder.Services.AddDbContext<AnotherCDbContext>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var policyName = "AllowedCorsOrigins";

builder.Services.AddCors(options =>
            options.AddPolicy(name: policyName, builder =>
                {
                    builder.SetIsOriginAllowed((string origin) =>
                        {
                            var uri = new Uri(origin);
                            return (uri.Host == "localhost");
                        })
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                }
            )
);

var app = builder.Build();

// app.UseCors(policyName);
app.UseCors(opt => opt.WithOrigins(Envs.frontendUrl));
// Configure the HTTP request pipeline.

if (!Envs.isInProduction)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
// Migrate latest database changes during startup
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider
        .GetRequiredService<AnotherCDbContext>();

    // Here is the migration executed
    if (dbContext is not null)
    {
        dbContext.Database.Migrate();
    }
}

app.UseAuthorization();

app.MapControllers();

app.Run();
