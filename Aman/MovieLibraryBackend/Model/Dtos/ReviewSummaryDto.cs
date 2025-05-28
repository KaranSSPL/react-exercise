namespace MovieLibraryApi.Model.Dtos;

public class ReviewSummaryDto
{
    public int Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedDate { get; set; }
}