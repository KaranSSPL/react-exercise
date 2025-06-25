'use client';

import { useEffect, useState } from 'react';

const RestaurantDropdown = ({ name }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch('/api/restaurant');
        if (res.ok) {
          const data = await res.json()
          setRestaurants(data);

          if (name) {
            const match = data.find((r) => r.name === name);
            if (match) setSelectedId(match.id.toString());
          }
        } else {
          console.error("Failed to fetch restaurants:", res.status);
        }
      } catch (error) {
        console.error(error);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [name]);

  const handleChange = (e) => {
    setSelectedId(e.target.value);
  };

  const options = restaurants.length
    ? restaurants.map((r) => (
      <option key={r.id} value={r.id}>
        {r.name}
      </option>
    ))
    : [<option key="none" disabled>No restaurants available</option>];

  return (
    <p>
      <label htmlFor="restaurantId">Restaurant</label>
      <select name="restaurantId" id="restaurantId" value={selectedId}
        onChange={handleChange} required>
        <option value="">--Select--</option>
        {loading ? <option disabled>Loading...</option> : options}
      </select>
    </p>
  )
}

export default RestaurantDropdown