import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MovieProvider as MovieContextProvider } from './context/MovieContext.jsx';
import Layout from "./components/Layout.jsx";
import MovieDetail from './components/MovieDetail.jsx';

const App = () => {
    return (
        <MovieContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />} />
                    <Route path="/movies/:id" element={<MovieDetail />} />
                </Routes>
            </BrowserRouter>
        </MovieContextProvider>
    )
}

export default App;
