import { useContext } from 'react'
import Header from './Header'
import NotFound from './NotFound'
import MovieLists from './MovieLists'
import Pagination from './Pagination'
import { MovieContext } from '../context/MovieContext'

const Layout = () => {
    const { foundSearchResult } = useContext(MovieContext);
    return (
        <div className="wrapper">
            <Header />
            {foundSearchResult ? (<NotFound />) : (
                <>
                    <MovieLists />
                    <Pagination />
                </>)}
        </div>
    )
}

export default Layout