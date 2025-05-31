using Microsoft.AspNetCore.Mvc;
using MovieLibraryApi.Interface;
using MovieLibraryApi.Model;
using MovieLibraryApi.Model.Dtos;

namespace MovieLibraryApi.Controllers;

[ApiController]
[Route("api/tv")]
public class ReviewTvSeriesController(ITvSeriesService tvService) : ControllerBase
{
	[HttpGet]
	[Route("{tvId}/reviews")]
	public async Task<ActionResult<ResponseModel>> GetTvReviewAsync(int tvId)
	{
		if (tvId <= 0)
			return BadRequest(ResponseModel.Fail("Movie id is invalid"));

		var response = await tvService.GetTvReviewAsync(tvId);

		if (response.data == null || response.data is IEnumerable<ReviewSummaryDto> reviews && !reviews.Any())
			return NoContent();

		return Ok(response);
	}

	[HttpPost]
	[Route("{tvId}/reviews")]
	public async Task<ActionResult<ResponseModel>> SaveReviewAsync(int tvId, [FromBody] ReviewMovieDto request)
	{
		if (tvId <= 0)
			return BadRequest(ResponseModel.Fail("Movie Id is required"));

		if (!ModelState.IsValid)
			return BadRequest(ResponseModel.Fail("Invalid Input"));

		var response = await tvService.SaveTvReviewAsync(tvId, request);

		return response.IsSuccess ? Ok(response) : BadRequest(response);
	}
}
