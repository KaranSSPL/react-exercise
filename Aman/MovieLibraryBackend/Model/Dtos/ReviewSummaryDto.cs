namespace MovieLibraryApi.Model.Dtos;

public class ReviewSummaryDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Comment { get; set; }
    public DateOnly CreatedDate { get; set; }
}