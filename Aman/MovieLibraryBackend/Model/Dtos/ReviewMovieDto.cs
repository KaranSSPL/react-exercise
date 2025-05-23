using System.ComponentModel.DataAnnotations;

namespace MovieLibraryApi.Model.Dtos;

public class ReviewMovieDto
{
    [Required(ErrorMessage = "Movie id is required.")]
    public int MovieId { get; set; }
    [Required]
    // [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")]
    public string? FirstName { get; set; }
    [Required]
    // [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")]
    public string? LastName { get; set; }
    [Required]
    // [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")]
    public string? Comment { get; set; }
}
