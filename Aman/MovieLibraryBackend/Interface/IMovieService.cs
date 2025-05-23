using MovieLibraryApi.Model;
using MovieLibraryApi.Model.Dtos;

namespace MovieLibraryApi.Interface;

public interface IMovieService
{
    /// <summary>
    /// Saves a movie review for the specified movie.
    /// </summary>
    /// <param name="movieId">The ID of the movie to which the review belongs.</param>
    /// <param name="request">The review details to be saved.</param>
    /// <returns>A <see cref="ResponseModel"/> indicating the success or failure of the operation.</returns>
    Task<ResponseModel> SaveReviewAsync(int movieId, ReviewMovieDto request);

    /// <summary>
    /// Retrieves all reviews for a specific movie by its ID.
    /// </summary>
    /// <param name="movieId">The ID of the movie for which to get reviews.</param>
    /// <returns>A <see cref="ResponseModel"/> containing the movie reviews.</returns>
    Task<ResponseModel> GetMovieReviewAsync(int movieId);
}
