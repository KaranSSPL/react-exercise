using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using MovieLibraryApi.Interface;
using MovieLibraryApi.Model;
using MovieLibraryApi.Model.Dtos;
using MovieLibraryApi.Persistence.Data;
using MovieLibraryApi.Persistence.Entities;

namespace MovieLibraryApi.Service;

public class TvSeriesService(AppDbContext dbContext,
	IMapper mapper) : ITvSeriesService
{
	public async Task<ResponseModel> GetTvReviewAsync(int tvId)
	{
		var reviews = await dbContext.ReviewTvSeries
		.Where(x => x.TvSeriesId == tvId)
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

	public async Task<ResponseModel> SaveTvReviewAsync(int tvId, ReviewMovieDto request)
	{
		var reviewTvSeries = mapper.Map<ReviewTvSeries>(request);
		reviewTvSeries.TvSeriesId = tvId;

		await dbContext.ReviewTvSeries.AddAsync(reviewTvSeries);
		var result = await dbContext.SaveChangesAsync();

		return result > 0 ? ResponseModel.Success("Review saved successfully.", null) : ResponseModel.Fail("Review are not saved");
	}
}
