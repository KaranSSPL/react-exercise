using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using MovieLibraryApi.Interface;
using MovieLibraryApi.Model;
using MovieLibraryApi.Model.Dtos;
using MovieLibraryApi.Persistence.Data;
using MovieLibraryApi.Persistence.Entities;

namespace MovieLibraryApi.Service;

public class MovieService(AppDbContext dbContext,
    IMapper mapper) : IMovieService
{
    public async Task<ResponseModel> SaveReviewAsync(ReviewMovieDto request)
    {
        try
        {
            var reviewMovie = mapper.Map<ReviewMovie>(request);
            await dbContext.ReviewMovie.AddAsync(reviewMovie);
            await dbContext.SaveChangesAsync();

            return new ResponseModel
            {
                IsSuccess = true,
                Message = "Review saved successfully.",
                ErrorDetails = string.Empty,
                data = null
            };
        }
        // ToDo : Add exception middleware
        // ToDo : Add logger
        catch (Exception ex)
        {
            return ResponseModel.Fail("An error occurred while saving the review.");
        }
    }

    public async Task<ResponseModel> GetMovieReviewAsync(int movieId)
    {
        try
        {
            var reviews = await dbContext.ReviewMovie
                .Where(x => x.MovieId == movieId)
                .OrderByDescending(x => x.CreatedDate)
                .ProjectTo<ReviewSummaryDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            return ResponseModel.Success(string.Empty, reviews);
        }
        // ToDo : Add exception middleware
        // ToDo : Add logger
        catch (Exception ex)
        {
            return ResponseModel.Fail("An error occurred while retrieving the review.");
        }
    }
}
