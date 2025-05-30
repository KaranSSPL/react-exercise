import { useEffect, useRef, useState } from 'react'

const genres = [{
    id: "popular",
    name: "Popular"
},
{
    id: "top_rated",
    name: "Top Rated"
}];

const SortMedia = ({ onSortSelect, selectedSortId, disabled }) => {
    const [showSortBy, setShowSortBy] = useState(false);
    const sortByRef = useRef(null);

    useEffect(() => {
        if (!showSortBy) return;
        const handleClickOutside = (event) => {
            if (sortByRef.current && !sortByRef.current.contains(event.target)) {
                setShowSortBy(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setShowSortBy(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [showSortBy]);

    const toggleSortBy = () => {
        setShowSortBy(!showSortBy);
    };

    const handleSortClick = (sortById) => {
        onSortSelect(sortById);
        setShowSortBy(false);
    };

    return (
        <div className='dropdown' ref={sortByRef}>
            <button className="genre-button" onClick={toggleSortBy} disabled={disabled}>
                Sort By
            </button>
            {showSortBy && (
                <ul className="genre-dropdown">
                    <li onClick={() => handleSortClick(null)}>
                        Reset
                    </li>
                    {
                        genres.map((genre) => (
                            <li
                                key={genre.id}
                                className={genre.id === selectedSortId ? 'selected-genre' : ''}
                                onClick={() => handleSortClick(genre.id)}>
                                {genre.name}
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    )
}

export default SortMedia