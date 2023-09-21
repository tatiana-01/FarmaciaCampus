using System.Reflection;
using ApiProyecto.Extensions;
using AspNetCoreRateLimit;
using Microsoft.EntityFrameworkCore;
using Persistencia;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
/* builder.Services.AddControllers(options =>{
    options.RespectBrowserAcceptHeader = true;
    options.ReturnHttpNotAcceptable = true;
}).AddXmlSerializerFormatters(); */
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigureRateLimiting();
builder.Services.ConfigureApiVersioning();
builder.Services.AddJwt(builder.Configuration);
builder.Services.AddApplicacionService();
builder.Services.AddAutoMapper(Assembly.GetEntryAssembly());
builder.Services.ConfigureCors();


builder.Services.AddDbContext<FarmaciaContext>(optionsBuilder =>
{
    string connectionString = builder.Configuration.GetConnectionString("ConexMysqlPc");
    optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    optionsBuilder.EnableSensitiveDataLogging();
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var loggerFactory = services.GetRequiredService<ILoggerFactory>();
    try
    {
        var context = services.GetRequiredService<FarmaciaContext>();
        await context.Database.MigrateAsync();
    }
    catch (Exception ex)
    {
        var logger = loggerFactory.CreateLogger<Program>();
        logger.LogError(ex, "Ocurrió un error durante la migración");
    }
}
app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseIpRateLimiting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
