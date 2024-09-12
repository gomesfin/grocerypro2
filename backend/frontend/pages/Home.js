import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [nutritionInfo, setNutritionInfo] = useState(null);

  const searchItems = async () => {
    const res = await axios.get(`/api/items/search?name=${query}`);
    setItems(res.data);
    setNutritionInfo(null); // Reset the nutrition info
  };

  const getNutritionInfo = async (itemName) => {
    const res = await axios.get(`/api/items/nutrition?query=${itemName}`);
    setNutritionInfo(res.data);
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
            <button onClick={() => getNutritionInfo(item.name)}>
              Get Nutrition Info
            </button>
          </li>
        ))}
      </ul>

      {nutritionInfo && (
        <div>
          <h3>Nutritional Information for {nutritionInfo.food_name}</h3>
          <p><strong>Calories:</strong> {nutritionInfo.nf_calories}</p>
          <p><strong>Protein:</strong> {nutritionInfo.nf_protein} g</p>
          <p><strong>Carbohydrates:</strong> {nutritionInfo.nf_total_carbohydrate} g</p>
          <p><strong>Fat:</strong> {nutritionInfo.nf_total_fat} g</p>
        </div>
      )}
    </div>
  );
};

export default Home;
