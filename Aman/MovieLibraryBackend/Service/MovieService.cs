using Microsoft.AspNetCore.Http.HttpResults;
using MovieLibraryApi.Interface;
using MovieLibraryApi.Model;
using NPoco;

namespace MovieLibraryApi.Service;

public class MovieService(IDatabase database) : IMovieService
{
    public async Task<bool> SaveReviewAsync(ReviewMovieDto request)
    {
        try
        {
            using var t = database.GetTransaction();
            var res = await database.InsertAsync(request);
            t.Complete();
            return res != null;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return false;
        }
    }

    public async Task<ResponseModel> GetMovieReviewAsync(int movieId)
    {
        try
        {
            var reviews = await database.FetchAsync<ReviewSummaryDto>("SELECT FirstName, LastName, Comment, CreatedDate FROM ReviewMovie WHERE MovieId = @0", movieId);

            return new ResponseModel
            {
                IsSuccess = true,
                data = reviews?.OrderByDescending(x => x.CreatedDate)
            };
        }
        catch (Exception)
        {
            return new ResponseModel
            {
                IsSuccess = false,
                Message = "An error occurred while retrieving the review."
            };
        }
    }
}
