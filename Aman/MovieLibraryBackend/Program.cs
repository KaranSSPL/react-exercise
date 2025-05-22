using Microsoft.Data.SqlClient;
using MovieLibraryApi.Interface;
using MovieLibraryApi.Service;
using NPoco;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.  
builder.Services.AddScoped<IDatabase>(provider =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    return new Database(connectionString, DatabaseType.SqlServer2012, SqlClientFactory.Instance);
});

// Register Servie & Interface
builder.Services.AddScoped<IMovieService, MovieService>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowLocalFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
