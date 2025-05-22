using Microsoft.AspNetCore.Mvc;
using MovieLibraryApi.Interface;
using MovieLibraryApi.Model;

namespace MovieLibraryApi.Controllers;

[Route("api")]
[ApiController]
public class ReviewMovieController(IMovieService movieService) : ControllerBase
{

    [HttpPost]
    [Route("save-review")]
    public async Task<ActionResult<ResponseModel>> SaveReviewAsync([FromBody] ReviewMovieDto request)
    {
        if (request == null)
        {
            return BadRequest(new ResponseModel
            {
                IsSuccess = false,
                Message = "Model is empty",
                data = null
            });
        }

        var response = await movieService.SaveReviewAsync(request);
        if (response)
        {
            return Ok(new ResponseModel
            {
                IsSuccess = true,
                Message = "Review saved successfully",
                data = null
            });
        }

        return StatusCode(500, new ResponseModel
        {
            IsSuccess = false,
            Message = "Failed to save review",
            data = null
        });
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

        var response = await movieService.GetMovieReviewAsync(movieId);
        if (!response.IsSuccess)
            return NotFound(response);

        if (response.data is IEnumerable<ReviewSummaryDto> reviews && !reviews.Any())
            return NoContent();

        return Ok(response);
    }
}
