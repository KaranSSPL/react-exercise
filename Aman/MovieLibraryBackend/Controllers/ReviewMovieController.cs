using Microsoft.AspNetCore.Mvc;
using MovieLibraryApi.Interface;
using MovieLibraryApi.Model;
using MovieLibraryApi.Model.Dtos;

namespace MovieLibraryApi.Controllers;

[ApiController]
[Route("api/movies")]
public class ReviewMovieController(IMovieService movieService) : ControllerBase
{
    [HttpGet]
    [Route("{movieId}/reviews")]
    public async Task<ActionResult<ResponseModel>> GetMovieReviewAsync(int movieId)
    {
        if (movieId <= 0)
            return BadRequest(ResponseModel.Fail("Movie id is invalid"));

        var response = await movieService.GetMovieReviewAsync(movieId);

        // ToDo: remove 404 status code
        if (response.data == null || response.data is IEnumerable<ReviewSummaryDto> reviews && !reviews.Any())
            return NoContent();

        return Ok(response);
    }

    [HttpPost]
    [Route("{movieId}/reviews")]
    public async Task<ActionResult<ResponseModel>> SaveReviewAsync(int movieId, [FromBody] ReviewMovieDto request)
    {
        if (movieId <= 0)
            return BadRequest(ResponseModel.Fail("Movie Id is required"));

        if (!ModelState.IsValid)
            return BadRequest(ResponseModel.Fail("Invalid Input"));

        var response = await movieService.SaveReviewAsync(movieId, request);

        // ToDO: remove 500 status code
        return response.IsSuccess ? Ok(response) : BadRequest(response);
    }
}
