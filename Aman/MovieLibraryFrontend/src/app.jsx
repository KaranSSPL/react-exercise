import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Loader from "./components/Loader.jsx";
import LayoutForList from "./components/LayoutForList.jsx";
import LayoutForDetail from "./components/LayoutForDetail.jsx";
import MovieContainer from "./pages/MovieContainer.jsx";

const MovieDetail = lazy(() => import('./pages/MovieDetail.jsx'));
const MovieGallery = lazy(() => import('./pages/MovieGallery.jsx'));
const SimilarMovies = lazy(() => import('./pages/SimilarMovies.jsx'));

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={
                        <LayoutForList>
                            <MovieContainer />
                        </LayoutForList>
                    } />
                    <Route path="/movies/:id" element={
                        <LayoutForDetail>
                            <MovieDetail />
                        </LayoutForDetail>
                    } />
                    <Route path="/movies/:id/gallery" element={
                        <LayoutForDetail>
                            <MovieGallery />
                        </LayoutForDetail>
                    } />
                    <Route path="/movies/:id/similar" element={
                        <LayoutForDetail>
                            <SimilarMovies />
                        </LayoutForDetail>
                    } />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App;
