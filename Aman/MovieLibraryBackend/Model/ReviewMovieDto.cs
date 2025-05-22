using NPoco;

namespace MovieLibraryApi.Model;

[TableName("ReviewMovie")]
[PrimaryKey("Id", AutoIncrement = true)]
public class ReviewMovieDto
{
    public int Id { get; set; }
    public string? MovieId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Comment { get; set; }
}

public class ReviewSummaryDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedDate { get; set; }
}
