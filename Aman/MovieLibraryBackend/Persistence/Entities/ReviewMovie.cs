using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieLibraryApi.Persistence.Entities
{
    public class ReviewMovie
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int MovieId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
