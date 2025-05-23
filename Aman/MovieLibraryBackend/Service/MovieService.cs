using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using MovieLibraryApi.Data;
using MovieLibraryApi.Interface;
using MovieLibraryApi.Model;
using MovieLibraryApi.Model.Dtos;
using MovieLibraryApi.Model.Entities;

namespace MovieLibraryApi.Service;

public class MovieService : IMovieService
{
    private readonly AppDbContext _dbContext;
    private readonly IMapper _mapper;
    public MovieService(AppDbContext dbContext,
        IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<ResponseModel> SaveReviewAsync(ReviewMovieDto request)
    {
        try
        {
            var reviewMovie = _mapper.Map<ReviewMovie>(request);
            await _dbContext.ReviewMovie.AddAsync(reviewMovie);
            await _dbContext.SaveChangesAsync();

            return new ResponseModel
            {
                IsSuccess = true,
                Message = "Review saved successfully.",
                ErrorDetails = string.Empty,
                data = null
            };
        }
        catch (Exception ex)
        {
            return new ResponseModel
            {
                IsSuccess = false,
                Message = "An error occurred while saving the review",
                ErrorDetails = ex.Message,
                data = null
            };
        }
    }

    public async Task<ResponseModel> GetMovieReviewAsync(int movieId)
    {
        try
        {
            var reviews = await _dbContext.ReviewMovie.Where(x => x.MovieId == movieId)
                .ProjectTo<ReviewSummaryDto>(_mapper.ConfigurationProvider)
                .OrderByDescending(x => x.CreatedDate).ToListAsync();

            return new ResponseModel
            {
                IsSuccess = true,
                Message = string.Empty,
                ErrorDetails = string.Empty,
                data = reviews
            };
        }
        catch (Exception ex)
        {
            return new ResponseModel
            {
                IsSuccess = false,
                Message = "An error occurred while retrieving the review.",
                ErrorDetails = ex.Message,
                data = null
            };
        }
    }
}
