import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MovieProvider } from './MovieContext.jsx';
import Header from "./components/Header.jsx";
import MovieLists from './components/MovieLists.jsx';
import Pagination from './components/Pagination.jsx';
import MovieDetail from './components/MovieDetail.jsx';

const App = () => {
    return (
        <MovieProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header />
                            <MovieLists />
                            <Pagination />
                        </>
                    }>
                    </Route>
                    <Route path="/movie-detail/:id" element={<MovieDetail />} />
                </Routes>
            </BrowserRouter>
        </MovieProvider>
    )
}

export default App;
