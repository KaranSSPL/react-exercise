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
            return BadRequest(new ResponseModel
            {
                IsSuccess = false,
                Message = "Movie id is invalid",
                data = null
            });

        var response = await movieService.GetMovieReviewAsync(movieId);

        // ToDo: remove 404 status code
        if (!response.IsSuccess)
            return NotFound(response);

        if (response.data is IEnumerable<ReviewSummaryDto> reviews && !reviews.Any())
            return NoContent();

        return Ok(response);
    }

    [HttpPost]
    [Route("{movieId}/reviews")]
    public async Task<ActionResult<ResponseModel>> SaveReviewAsync(int movieId, [FromBody] ReviewMovieDto request)
    {
        if (!ModelState.IsValid || movieId <= 0)
        {
            return BadRequest(new ResponseModel
            {
                IsSuccess = false,
                Message = "Invalid Input",
                data = null
            });
        }

        var response = await movieService.SaveReviewAsync(request);
        if (response.IsSuccess)
        {
            return Ok(response);
        }

        // ToDO: remove 500 status code
        return StatusCode(500, response);
    }
}
