namespace MovieLibraryApi.Model;

public class ResponseModel
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
    public string? ErrorDetails { get; set; }
    public object? data { get; set; }


    public static ResponseModel Success(string message, object? data)
    {
        return new ResponseModel
        {
            IsSuccess = true,
            Message = message,
            data = data
        };
    }


    public static ResponseModel Fail(string message, string error = "")
    {
        return new ResponseModel
        {
            IsSuccess = false,
            Message = message,
            ErrorDetails = error
        };
    }
}
