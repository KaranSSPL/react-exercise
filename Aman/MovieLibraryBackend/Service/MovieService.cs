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
	public async Task<ResponseModel> SaveReviewAsync(int movieId, ReviewMovieDto request)
	{
		var reviewMovie = mapper.Map<ReviewMovie>(request);
		reviewMovie.MovieId = movieId;

		await dbContext.ReviewMovie.AddAsync(reviewMovie);
		var result = await dbContext.SaveChangesAsync();

		return result > 0 ? ResponseModel.Success("Review saved successfully.", null) : ResponseModel.Fail("Review are not saved");
	}

	public async Task<ResponseModel> GetMovieReviewAsync(int movieId)
	{
		var reviews = await dbContext.ReviewMovie
		.Where(x => x.MovieId == movieId)
		.OrderByDescending(x => x.CreatedDate)
		.ProjectTo<ReviewSummaryDto>(mapper.ConfigurationProvider)
		.ToListAsync();

		var istTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
		foreach (var review in reviews)
		{
			review.CreatedDate = TimeZoneInfo.ConvertTimeFromUtc(review.CreatedDate, istTimeZone);
		}

		return reviews.Count > 0
			? ResponseModel.Success(string.Empty, reviews)
			: ResponseModel.Fail("Reviews are empty");
	}
}
