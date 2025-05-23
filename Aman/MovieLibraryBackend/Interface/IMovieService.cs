using MovieLibraryApi.Model;
using MovieLibraryApi.Model.Dtos;

namespace MovieLibraryApi.Interface;

public interface IMovieService
{
    /// <summary>
    /// 
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    Task<ResponseModel> SaveReviewAsync(ReviewMovieDto request);

    /// <summary>
    /// 
    /// </summary>
    /// <param name="movieId"></param>
    /// <returns></returns>
    Task<ResponseModel> GetMovieReviewAsync(int movieId);
}
