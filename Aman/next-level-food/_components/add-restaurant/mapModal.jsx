'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import classes from './mapModal.module.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapModal = ({ onClose, onSave }) => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);

    const [locationLabel, setLocationLabel] = useState('');
    const [selectedCoords, setSelectedCoords] = useState(null);

    useEffect(() => {
        if (mapRef.current) return;
        const defaultCoords = { lat: 26.9267, lng: 75.8096 };

        mapRef.current = L.map(mapContainerRef.current).setView([defaultCoords.lat, defaultCoords.lng], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapRef.current);

        markerRef.current = L.marker([defaultCoords.lat, defaultCoords.lng]).addTo(mapRef.current);

        setSelectedCoords(defaultCoords);

        mapRef.current.on('click', (e) => {
            const { lat, lng } = e.latlng;
            setSelectedCoords({ lat, lng });

            if (markerRef.current) {
                markerRef.current.setLatLng([lat, lng]);
            } else {
                markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
            }
        });
    }, []);

    const handleSave = () => {
        if (selectedCoords && locationLabel.trim()) {
            onSave({
                label: locationLabel,
                coordinates: [selectedCoords.lng, selectedCoords.lat],
            });
            onClose();
        }
    };

    return (
        <div className={classes["map-overlay"]}
    onClick={onClose}>
            <div className={classes["map-section"]}
                onClick={(e) => e.stopPropagation()}>
                <div className={classes.map} ref={mapContainerRef} />
                <input
                    className={classes["location-label"]}
                    type="text"
                    placeholder="Enter location label"
                    value={locationLabel}
                    onChange={(e) => setLocationLabel(e.target.value)}
                    required
                />
                <button onClick={handleSave} className={classes["location-save"]}>Save Location</button>
            </div>
        </div>
    )
}

export default MapModal