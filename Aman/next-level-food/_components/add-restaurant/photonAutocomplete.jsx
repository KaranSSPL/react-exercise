'use client';

import { useEffect, useState } from "react";
import SuggestionList from "./suggestionList";
import dynamic from 'next/dynamic';

const MapModal = dynamic(() => import('./mapModal'), { ssr: false });


const PhotonAutocomplete = ({ onSelect }) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(true);
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchSuggestions = async () => {
            if (!shouldFetch || inputValue.length < 3) {
                setSuggestions([]);
                return;
            }

            try {
                const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(inputValue)}&limit=5`, { signal: controller.signal });

                const data = await res.json();

                const results = [...new Map(data.features.map(item => [item.properties.name, {
                    label: item.properties.name,
                    coordinates: item.geometry.coordinates
                }])).values()];

                setSuggestions(results);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error fetching suggestions: ', error);
                }
            }
        };

        const timeOut = setTimeout(fetchSuggestions, 100);
        return () => {
            clearTimeout(timeOut);
            controller.abort();
        }
    }, [inputValue, shouldFetch]);

    const handleSelect = (suggestion) => {
        setInputValue(suggestion.label);
        onSelect(suggestion);
        setShouldFetch(false);
        setSuggestions([]);
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setShouldFetch(true);
    };

    const handleMapConfirm = () => {
        setShowMap(true);
    };

    const handleMapSave = (location) => {
        setInputValue(location.label);
        onSelect(location);
        setShouldFetch(false);
        setSuggestions([]);
    };

    return (
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                value={inputValue}
                id="location"
                name="location"
                placeholder="Search for location..."
                onChange={handleChange}
                required
                autoComplete="off"
            />
            {suggestions.length > 0 && (
                <SuggestionList suggestions={suggestions} onSelect={handleSelect} onMapSelect={handleMapConfirm} />
            )}
            {showMap && (
                <MapModal
                    onClose={() => setShowMap(false)}
                    onSave={handleMapSave}
                />
            )}
        </div>
    )
}

export default PhotonAutocomplete