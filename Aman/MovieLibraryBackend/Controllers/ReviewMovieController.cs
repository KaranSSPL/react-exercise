using Microsoft.AspNetCore.Mvc;
using MovieLibraryApi.Interface;
using MovieLibraryApi.Model;
using MovieLibraryApi.Model.Dtos;

namespace MovieLibraryApi.Controllers;

[Route("api")]
[ApiController]
public class ReviewMovieController : ControllerBase
{
    private readonly IMovieService _movieService;
    public ReviewMovieController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpPost]
    [Route("save-review")]
    public async Task<ActionResult<ResponseModel>> SaveReviewAsync([FromBody] ReviewMovieDto request)
    {
        if (!ModelState.IsValid || request.MovieId <= 0)
        {
            return BadRequest(new ResponseModel
            {
                IsSuccess = false,
                Message = "Invalid Input",
                data = null
            });
        }

        var response = await _movieService.SaveReviewAsync(request);
        if (response.IsSuccess)
        {
            return Ok(response);
        }

        return StatusCode(500, response);
    }

    [HttpGet]
    [Route("movies/{movieId}")]
    public async Task<ActionResult<ResponseModel>> GetMovieReviewAsync(int movieId)
    {
        if (movieId <= 0)
            return BadRequest(new ResponseModel
            {
                IsSuccess = false,
                Message = "Movie id is invalid",
                data = null
            });

        var response = await _movieService.GetMovieReviewAsync(movieId);
        if (!response.IsSuccess)
            return NotFound(response);

        if (response.data is IEnumerable<ReviewSummaryDto> reviews && !reviews.Any())
            return NoContent();

        return Ok(response);
    }
}
