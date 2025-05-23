namespace MovieLibraryApi.Model;

public class ResponseModel
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
    public string? ErrorDetails { get; set; }
    public object? data { get; set; }
}
