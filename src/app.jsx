import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { MovieProvider as MovieContextProvider } from './context/MovieContext.jsx';
import Layout from "./components/Layout.jsx";
import Loader from "./components/Loader.jsx";

const MovieDetail = lazy(() => import('./components/MovieDetail.jsx'));

const App = () => {
    return (
        <MovieContextProvider>
            <BrowserRouter>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<Layout />} />
                        <Route path="/movies/:id" element={<MovieDetail />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </MovieContextProvider>
    )
}

export default App;
