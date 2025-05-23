using System.ComponentModel.DataAnnotations;

namespace MovieLibraryApi.Model.Dtos;
public class ReviewMovieDto
{
    [Required]
    public int MovieId { get; set; }
    [Required]
    public string? FirstName { get; set; }
    [Required]
    public string? LastName { get; set; }
    [Required]
    public string? Comment { get; set; }
}

public class ReviewSummaryDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedDate { get; set; }
}
