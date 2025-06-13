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

```
MovieLibraryBackend/
│
├── Controllers/
│   ├── ReviewMovieController.cs
│   └── ReviewTvSeriesController.cs
│
├── Interface/
│   ├── IMovieService.cs
│   └── ITvSeriesService.cs
│
├── Mapping/
│   └── MappingProfile.cs
│
├── Middlewares/
│   └── ExceptionMiddleware.cs
│
├── Models/
│   ├── ReviewMovieDto.cs
│   ├── ReviewTvSeriesDto.cs
│   └── ResponseModel.cs
│
├── Persistence/
│   ├── Context
│   │   └── AppDbContext.cs
│   ├── Entities
│   │   ├── ReviewTvSeriesDto.cs
│   │   └── ResponseModel.cs
│   └── Migrations
│       └── ... (EF Core migration files)
│
├── Services/
│   ├── MovieService.cs
│   └── TvSeriesService.cs
│
├── wwwroot/
│   └── ... (Frontend build output)
│
├── MovieLibraryApi.csproj
├── Program.cs
├── appsettings.json
└── README.md
```

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

## Database Setup

### 1. Create the Database in MS SQL Server

- Open SQL Server Management Studio (SSMS).
- Connect to your SQL Server instance.
- Run the following SQL to create a new database (replace `MovieLibraryDb` with your preferred name):

    ```sql
    CREATE DATABASE MovieLibraryDb;
    ```

### 2. Set the Connection String

- Open `appsettings.json`.
- Update the `DefaultConnection` string with your SQL Server details:

    ```json
    // appsettings.json
    {
      "ConnectionStrings": {
        "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=MovieLibraryDb;Trusted_Connection=True;MultipleActiveResultSets=true"
      }
      // ...other settings...
    }
    ```

    - Replace `YOUR_SERVER_NAME` with your SQL Server instance name.
    - If using SQL authentication, use:  
      `Server=YOUR_SERVER_NAME;Database=MovieLibraryDb;User Id=YOUR_USER;Password=YOUR_PASSWORD;`

### 3. Install Required Packages

If you need to set up the project locally, install these NuGet packages (if not already present):

- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools

You can install them using the terminal:

```sh
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

### 4. Run EF Core Migrations

To create the database tables automatically, run these commands in the project directory:

```sh
dotnet ef migrations add InitialCreate
dotnet ef database update
```

- This will create the required tables in your database.

---

### If Deploying Directly to IIS (Without Running Migrations Locally)

If you publish and deploy the output folder directly to IIS, you must manually create the database and tables.

#### Table Schemas

**ReviewMovie Table:**

```sql
CREATE TABLE ReviewMovie (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    MovieId INT NOT NULL,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Comment NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME2 NOT NULL
);
```

**ReviewTvSeries Table:**

```sql
CREATE TABLE ReviewTvSeries (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    TvSeriesId INT NOT NULL,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Comment NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME2 NOT NULL
);
```

- Make sure your connection string in `appsettings.json` points to this database.

---

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
   - Point the site�s physical path to your published output folder.
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