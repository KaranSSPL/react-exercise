using AutoMapper;
using MovieLibraryApi.Model.Dtos;
using MovieLibraryApi.Model.Entities;

namespace MovieLibraryApi.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ReviewMovieDto, ReviewMovie>();
        CreateMap<ReviewMovie, ReviewSummaryDto>();
    }
}
