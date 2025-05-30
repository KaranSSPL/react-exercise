using System.ComponentModel.DataAnnotations;

namespace MovieLibraryApi.Model.Dtos;

public class ReviewMovieDto
{
    [Required(ErrorMessage = "First name is required.")]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "First name must be between 2 and 50 characters.")]
    public string? FirstName { get; set; }

    [Required(ErrorMessage = "Last name is required.")]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "Last name must be between 2 and 50 characters.")]
    public string? LastName { get; set; }

    [Required(ErrorMessage = "Comment is required.")]
    [StringLength(500, MinimumLength = 5, ErrorMessage = "Comment must be between 5 and 500 characters.")]
    public string? Comment { get; set; }
}
