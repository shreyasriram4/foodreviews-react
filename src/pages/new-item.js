import React, { useState } from 'react';
import NewItemForm from '../components/FoodForm';

const NewMenuItemPage = () => {
  const [message, setMessage] = useState('');
  const handleNewItemSubmit = async (newItem) => {
    console.log('New Food Item:', newItem);
    setMessage('New menu item added successfully!'); // Set message state instead of alert
  };

  return (
    <div style={{backgroundColor: "#f3ebd1", height: "500px", paddingTop: "15px"}}>
      <h1 style={{ fontSize: '30px', color: '#374281', textAlign: 'center', paddingTop: '10px', paddingBottom: '10px', width: '60%', margin: '0 auto'}}>
        Create New Menu Item
      </h1>
      {message && <p style={{ textAlign: 'center', color: 'green' }}>{message}</p>}
      <NewItemForm onSubmit={handleNewItemSubmit} />
    </div>
  );
};

export default NewMenuItemPage;

