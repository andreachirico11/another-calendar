using anotherCalendarBe.utils;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

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

app.UseCors(policyName);
// app.UseCors(opt => opt.WithOrigins(Envs.frontendUrl()));
// Configure the HTTP request pipeline.
if (!Envs.isInProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
