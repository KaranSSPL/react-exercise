'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';

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

        mapRef.current = L.map(mapContainerRef.current).setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapRef.current);

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
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{ width: '80%', height: '80%', background: '#fff', padding: '1rem', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>✖</button>
                <div ref={mapContainerRef} style={{ width: '100%', height: '70%' }} />
                <input
                    type="text"
                    placeholder="Enter location label"
                    value={locationLabel}
                    onChange={(e) => setLocationLabel(e.target.value)}
                    style={{ width: '100%', marginTop: '1rem' }}
                />
                <button onClick={handleSave} style={{ marginTop: '0.5rem', width: '100%' }}>Save Location</button>
            </div>
        </div>
    )
}

export default MapModal