using anotherCalendarBe;
using anotherCalendarBe.utils;
using Microsoft.EntityFrameworkCore;

var production = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production";

var builder = WebApplication.CreateBuilder(args);

Envs.SetupEnvs(production, builder.Configuration.GetRequiredSection("Settings").Get<Settings>());


builder.Services.AddDbContext<AnotherCDbContext>();

builder.Services.AddCors(
    options =>
    {
        options.AddPolicy(CorsPolicies.FE_ONLY, policy =>
            {
                policy.SetIsOriginAllowed((string origin) =>
                            {
                                var uri = new Uri(origin);
                                return (uri.Host == "localhost");
                            }).AllowAnyHeader().AllowAnyMethod();
            });
        options.AddPolicy(CorsPolicies.OFF, policy =>
            {
                policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            });
    }
);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ----------------------------------------

var app = builder.Build();

Console.WriteLine("\n---------------------------------------\n");
Console.WriteLine("Environments name: " + Envs.envsName);
Console.WriteLine(Envs.isInProduction ? "Production Mode" : "Development Mode");
Console.WriteLine("FE origins: " + Envs.frontendUrl);
Console.WriteLine("Using the cors policy: " + Envs.corsPolicy);
if (Envs.migrationAtLaunch)
{
    Console.WriteLine("Migrations will be applied at launch");
}
Console.WriteLine("\n---------------------------------------\n");


app.UseCors(Envs.corsPolicy);

if (!Envs.isInProduction)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider
        .GetRequiredService<AnotherCDbContext>();
    if (dbContext is not null && Envs.migrationAtLaunch)
    {
        dbContext.Database.Migrate();
    }
}


app.UseAuthorization();

app.MapControllers();

app.Run();
