import { MovieProvider } from './MovieContext.jsx';
import Header from "./components/Header.jsx";
import MovieLists from './components/MovieLists.jsx';
import Pagination from './components/Pagination.jsx';
import MovieDetail from './components/MovieDetail.jsx';

const App = () => {
    return (
        <MovieProvider>
            <Header />
            <MovieLists />
            <Pagination />
            <MovieDetail />
        </MovieProvider>
    )
}

export default App;
