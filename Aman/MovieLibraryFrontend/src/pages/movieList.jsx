import MovieListCard from '../components/MovieListCard.jsx';
import Loader from '../components/Loader.jsx';

const MovieList = ({ loader, moviesList }) => {
    return (
        <div className="movie-grid">
            {loader && (<Loader />)}
            {moviesList && moviesList.length > 0 ? (
                moviesList?.map(item => <MovieListCard key={item.id} movie={item} />)
            ) : null}
        </div>
    )
}

export default MovieList;