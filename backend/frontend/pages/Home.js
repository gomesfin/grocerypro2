import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);

  const searchItems = async () => {
    const res = await axios.get(`/api/items/search?name=${query}`);
    setItems(res.data);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search items"
      />
      <button onClick={searchItems}>Search</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.store} - {item.unit} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
