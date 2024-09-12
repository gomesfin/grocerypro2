import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch user's cart items if logged in
    const fetchCart = async () => {
      // Assuming token and userId are stored after login
      const res = await axios.get(`/api/users/cart`);
      setCartItems(res.data);
    };
    fetchCart();
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>{item.name} - {item.unit} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
