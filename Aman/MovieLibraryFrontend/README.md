# Movie Library Frontend

This is a React-based Movie Library application that allows users to browse, search, and explore movies and TV shows using data from [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api). Users can view detailed information, images, trailers, and similar titles for each movie or TV show. Additionally, users can add and view reviews for movies and TV shows, with review data managed by a custom .NET backend API.

## Folder Structure

```
MovieLibraryFrontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   └── ...
├── .env.production
├── package.json
└── README.md
```

## Environment Variables

Environment variables are set in `.env.production` (or `.env` for development):

```env
VITE_APP_MOVIE_API_BASE_URL=https://api.themoviedb.org
VITE_APP_MOVIE_API_LANGUAGE=en-US
VITE_APP_MOVIE_TOKEN=<your_tmdb_token>
VITE_APP_IMAGE_URL=https://image.tmdb.org/t/p
VITE_APP_REVIEW_API_BASE_URL=<your_dotnet_project_url>
```

- `VITE_APP_MOVIE_API_BASE_URL`: TMDb API base URL.
- `VITE_APP_MOVIE_API_LANGUAGE`: Language for TMDb API.
- `VITE_APP_MOVIE_TOKEN`: Token for TMDb API.
- `VITE_APP_IMAGE_URL`: Base URL for images.
- `VITE_APP_REVIEW_API_BASE_URL`: Your backend API for reviews.

## Running the Project

### 1. Backend

1. Go to the backend folder:
   ```sh
   cd ../MovieLibraryBackend
   ```
2. Start the backend:
   ```sh
   dotnet restore
   dotnet run
   ```

### 2. Frontend

1. Go to the frontend folder:
   ```sh
   cd ../MovieLibraryFrontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up your `.env.production` or `.env` file as shown above.
4. Start the frontend:
   ```sh
   npm run dev
   ```
   (Default: http://localhost:5173)

### 3. Running Together or Separately

- **Together:** Start both backend and frontend as above. The frontend will use the backend for reviews.
- **Frontend Only:** If you only want TMDb features (no reviews), you can run just the frontend. Review features will be disabled or show errors if the backend is not running.

---

**Note:** Replace `<your_tmdb_token>` with your actual TMDb API token.

## Features

- **Browse Movies & TV Shows:**  
  View a paginated list of popular movies and TV shows fetched from TMDb.

- **Search:**  
  Search for movies or TV shows by title.

- **Genres:**  
  - View genres for movies and TV shows, fetched from the TMDb API.
  - Click on any genre to see a list of movies or TV shows belonging to that genre (using the TMDb `/discover` endpoint).
  - **Note:** You cannot search for movies or TV shows by both genre and keyword at the same time, because the TMDb API does not support searching by genre in the `/search` endpoint. Genre-based filtering is only available via the `/discover` endpoint, which does not support keyword search.

- **Sort Options:**  
  - Sort movies and TV shows by "Popular" or "Top Rated" using the TMDb `/movie/popular`, `/movie/top_rated`, `/tv/popular`, and `/tv/top_rated` endpoints.
  - **Note:** Sorting by "Popular" or "Top Rated" cannot be combined with search or genre filtering, because the `/search` endpoint does not support sorting, and the `/discover` endpoint does not provide direct access to these sort types.

- **Movie/TV Show Details:**  
  View detailed information including title, release date, rating, genres, description, and poster/backdrop images.

- **Image Gallery:**  
  Browse a gallery of images/posters for each movie or TV show.

- **Similar Titles:**  
  Discover similar movies or TV shows based on the current selection.

- **Watch Trailers:**  
  Watch official trailers directly via YouTube links.

- **User Reviews:**  
  - View user-submitted reviews for each movie or TV show.
  - Add your own review (name and comment) for any title.
  - Reviews are stored and retrieved from a custom .NET backend API.

- **Share Functionality:**  
  Share movie or TV show details via social media or by copying a direct link.

## API Limitations & UI Behavior

- **Genre Filtering:**  
  - To filter by genre, the app uses the `/discover/movie` and `/discover/tv` endpoints from TMDb.
  - The `/search` endpoint does not support filtering by genre, and the `/discover` endpoint does not support searching by keyword.
  - This means you can either filter by genre or search by keyword, but not both at the same time due to TMDb API limitations.

- **Sorting:**  
  - Sorting by "Popular" or "Top Rated" is only available via the `/movie/popular`, `/movie/top_rated`, `/tv/popular`, and `/tv/top_rated` endpoints.
  - The `/search` endpoint does not support sorting, and the `/discover` endpoint does not provide direct sorting for "Popular" or "Top Rated".
  - Therefore, you cannot combine sorting with search or genre filtering.

- **UI Behavior:**  
  - When a genre is selected, the sort and search features are disabled.
  - When a sort option is selected, the genre and search features are disabled.
  - When searching, both genre and sort options are disabled.
  - This ensures the UI only allows combinations supported by the TMDb API.

- **Pagination:**  
  - TMDb API supports pagination for listing movies and TV shows, but only for pages 1 to 500.
  - If you request a page number greater than 500, TMDb returns a 400 status code with the following response:
    ```json
    {
      "success": false,
      "status_code": 22,
      "status_message": "Invalid page: Pages start at 1 and max at 500. They are expected to be an integer."
    }
    ```
  - When the page number exceeds 500, this message is shown in the UI to inform the user.

---

**Note:** This project uses the TMDb API but is not endorsed or certified by TMDb.