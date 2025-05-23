using AutoMapper;
using MovieLibraryApi.Model.Dtos;
using MovieLibraryApi.Persistence.Entities;

namespace MovieLibraryApi.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ReviewMovieDto, ReviewMovie>().ReverseMap();
        CreateMap<ReviewMovie, ReviewSummaryDto>().ReverseMap();
    }
}
