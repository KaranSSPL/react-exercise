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

- **Integrated Frontend Build & Publish:**  
  The solution contains both the API and frontend projects. The frontend project is automatically built and published into the `wwwroot` folder of the API project during the .NET publish process. This is handled by a custom MSBuild target in `MovieLibraryApi.csproj`, so you do **not** need to build or copy the frontend manually.

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

## Publishing & Deployment

### Publishing the Application

**No manual frontend build or copy is required.**  
When you publish the .NET API project (using Visual Studio or the `dotnet publish` command), the frontend project is automatically built and its output is copied to the `wwwroot` folder. This is configured in the `MovieLibraryApi.csproj` file:

- The `BuildFrontend` MSBuild target runs before publish, building the frontend and copying its output.
- The published output contains both the API and the frontend, ready for deployment.

### Deploying to IIS

1. **Publish Output:**  
   Deploy the published output (including the `wwwroot` folder with frontend files) to your IIS server.

2. **Create Application Pool:**  
   - In IIS Manager, create a new Application Pool.
   - Set the **.NET CLR version** to **No Managed Code** (since ASP.NET Core runs in a separate process and does not use IIS's managed pipeline).

3. **Create IIS Site:**  
   - Point the site’s physical path to your published output folder.
   - Assign the site to the application pool you created.

4. **Start the Site:**  
   - Ensure the site is started and accessible.

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
- Vite (or other SPA frontend, as configured)

## License

This project is for educational and demonstration purposes.