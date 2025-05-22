namespace MovieLibraryApi.Model;

public class ResponseModel
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
    public object? data { get; set; }
}
