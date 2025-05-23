using MovieLibraryApi.Model;
using MovieLibraryApi.Model.Dtos;

namespace MovieLibraryApi.Interface;

public interface IMovieService
{
    Task<ResponseModel> SaveReviewAsync(ReviewMovieDto request);
    Task<ResponseModel> GetMovieReviewAsync(int movieId);
}
