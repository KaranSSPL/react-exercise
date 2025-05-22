using MovieLibraryApi.Model;

namespace MovieLibraryApi.Interface;

public interface IMovieService
{
    Task<bool> SaveReviewAsync(ReviewMovieDto request);
    Task<ResponseModel> GetMovieReviewAsync(int movieId);
}
