using MovieLibraryApi.Model;
using MovieLibraryApi.Model.Dtos;

namespace MovieLibraryApi.Interface;

public interface ITvSeriesService
{
    Task<ResponseModel> GetTvReviewAsync(int tvId);
    Task<ResponseModel> SaveTvReviewAsync(int tvId, ReviewMovieDto request);
}
