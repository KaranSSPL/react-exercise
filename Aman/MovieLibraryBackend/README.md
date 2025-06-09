# MovieLibraryApi

MovieLibraryApi is a .NET 8 Web API project designed to manage user reviews for movies and TV shows. It provides endpoints to save and retrieve reviews, supporting integration with frontend applications for a complete review experience.

## Features

- **Save Reviews:**  
  Users can submit reviews (first name, last name, comment) for both movies and TV shows.

- **Get Reviews:**  
  Retrieve all reviews for a specific movie or TV show.

- **RESTful API:**  
  Clean, RESTful endpoints for easy integration.

- **Validation:**  
  Input validation ensures reviews meet required criteria.

- **Database Integration:**  
  Uses Entity Framework Core with SQL Server for persistent storage.

- **Swagger/OpenAPI:**  
  Built-in API documentation for easy testing and exploration.

## Project Structure

- **Controllers:**  
  - `ReviewMovieController`: Handles movie review endpoints.
  - (Similar controller exists for TV show reviews.)

- **Services:**  
  - `IMovieService` / `MovieService`: Business logic for movie reviews.
  - `ITvSeriesService` / `TvSeriesService`: Business logic for TV show reviews.

- **Data Access:**  
  - `AppDbContext`: Entity Framework Core context managing review entities and database operations.

- **Models:**  
  - `ReviewMovieDto`: DTO for review submission.
  - `ResponseModel`: Standard API response wrapper.

## Database

- **Tables:**  
  - `ReviewMovie`: Stores movie reviews.
  - `ReviewTvSeries`: Stores TV show reviews.

- **Migrations:**  
  Database schema is managed via EF Core migrations.

## Getting Started

1. **Configure Connection String:**  
   Set your SQL Server connection string in `appsettings.json` under `DefaultConnection`.

2. **Run Migrations:**  
   Apply migrations to create the database schema.

3. **Start the API:**  
   Run the project. Swagger UI will be available for testing endpoints.

## Example Endpoints

- `GET /api/movie/{movieId}/reviews`  
  Retrieve all reviews for a movie.

- `POST /api/movie/{movieId}/reviews`  
  Submit a new review for a movie.

- (Similar endpoints exist for TV shows.)

## Technologies Used

- .NET 8
- Entity Framework Core
- SQL Server
- ASP.NET Core Web API

## License

This project is for educational and demonstration purposes.