import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MovieContext } from '../MovieContext.jsx';

const MovieLists = () => {
    const { movies } = useContext(MovieContext);
    // const navigate = useNavigate();

    // const movieDetail = async (e, id) => {
    //     e.preventDefault();
    //     navigate(`/movie-detail/${id}`);
    // };

    return (
        <>
            <div className="movie-grid">
                {
                    movies.map(item => (
                        <Link to={`/movie-detail/${item.id}`} className="movie-link" target='_blank' key={item.id} style={{ textDecoration: 'none', color: 'inherit' }} >
                            {/* <div role="button" className="movie-link" onClick={(e) => movieDetail(e, item.id)} key={item.id}> */}
                            <div className="movie-card">
                                <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} className="movie-poster" alt="Movie Poster" />
                                <div className="movie-info">
                                    <div className="movie-title">{item.title}</div>
                                    <div className="movie-release-date">{item.release_date}</div>
                                    <div className="movie-description">{item.overview.substring(0, 120)} <strong>read more</strong></div>
                                    <div className="movie-rating">⭐ {item.vote_average}</div>
                                </div>
                            </div>
                            {/* </div> */}
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default MovieLists;