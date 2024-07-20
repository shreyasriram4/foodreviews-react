import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase auth import
import * as db from '../database';
import Link from 'next/link';

export default function MenuItem(props) {
  const [foodItems, setFoodItems] = useState([]);
  const [user, setUser] = useState(null);  // State to track user login

  // Initialize auth and set up auth state listener
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user in state if logged in, null if not
    });
    return () => unsubscribe();  // Clean up subscription
  }, []);

  const getFoodItems = async () => {
    const allFoodItems = await db.getFoodItems();
    console.log(allFoodItems);
    setFoodItems(allFoodItems);
  };

  useEffect(() => {
    getFoodItems();
  }, []);

  // Function to handle the deletion of a food item
  const handleDelete = async (foodItemId) => {
    await db.deleteFoodItem(foodItemId);
    getFoodItems();  // Refresh the list after deletion
  };

  return (
    <div>
      <h1 style={{fontSize:'28px', color:'#f3ebd1', textAlign: 'center', marginTop: '30px', backgroundColor: '#374281', padding: '20px'}}>&#127789;&#127791;Current Menu Items&#127847;&#129386; </h1>
      {foodItems.length > 0 ? (
        foodItems.map((foodItem, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              paddingLeft: "30px",
              borderRadius: "10px",
              maxWidth: "900px",
              margin: "auto",
              marginTop: "10px",
            }}
          >
            <h2>{foodItem.name}</h2>
            <p>{foodItem.description}</p>
            <p style={{marginBottom:'15px'}}> ${foodItem.price}</p>
            <Link href={`/write-review?foodItemId=${foodItem.id}`} style={{backgroundColor: '#FFC107', color: '#27335c', padding: '8px', borderRadius: '5px', fontWeight: 'bold'}}>
              Write Review
            </Link>
            {user && ( // Only show delete button if user is logged in
              <button onClick={() => handleDelete(foodItem.id)} style={{ fontFamily:'Roboto Slab, serif', border: 'none', fontSize:'16px', backgroundColor: '#D50000', color: '#fff', padding: '8px', borderRadius: '5px', fontWeight: 'bold', marginLeft: '10px' }}>
                Delete Item
              </button>
            )}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
