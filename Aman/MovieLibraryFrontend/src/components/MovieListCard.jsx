import { Link } from "react-router-dom"
import { envVar } from "../utils/env-var";

const MovieListCard = ({ media, currentPage, mediaType }) => {
    const page = currentPage || 1;
    return (
        <Link to={`/${mediaType}/${media.id}?page=${page}`} className="movie-link" >
            <div className="movie-card">
                <img src={`${envVar.tmdbApi.image.baseUrl}/w200${media.poster_path}`} className="movie-poster" alt="Movie Poster" />
                <div className="movie-info">
                    <div className="movie-title">{media.title ?? media.name}</div>
                    <div className="movie-release-date">{media.release_date ?? media.first_air_date}</div>
                    <div className="movie-description">{media.overview.substring(0, 120)} <strong>read more</strong></div>
                    <div className="movie-rating">⭐ {media.vote_average}</div>
                </div>
            </div>
        </Link>
    )
}

export default MovieListCard