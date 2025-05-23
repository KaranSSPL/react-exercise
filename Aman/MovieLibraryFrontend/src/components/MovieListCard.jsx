import { Link } from "react-router-dom"

const MovieListCard = ({ movie }) => {
    return (
        <Link to={`/movies/${movie.id}`} className="movie-link" >
            <div className="movie-card">
                <img src={`${process.env.REACT_APP_IMAGE_URL}/w200${movie.poster_path}`} className="movie-poster" alt="Movie Poster" />
                <div className="movie-info">
                    <div className="movie-title">{movie.title}</div>
                    <div className="movie-release-date">{movie.release_date}</div>
                    <div className="movie-description">{movie.overview.substring(0, 120)} <strong>read more</strong></div>
                    <div className="movie-rating">⭐ {movie.vote_average}</div>
                </div>
            </div>
        </Link>
    )
}

export default MovieListCard