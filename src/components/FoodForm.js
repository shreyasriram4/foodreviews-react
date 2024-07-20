// components/ReviewForm.js
import React, { useEffect, useState } from 'react';
import styles from '../styles/NewItemForm.module.css'; // Assume CSS module for styling
import firebase from 'firebase/app'; // Import Firebase
import 'firebase/firestore'; // Import Firestore
import { useRouter } from 'next/router';
import * as db from '../database';

export default function FoodForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const submitFood = async (e) => {
    e.preventDefault();
    await db.createFoodItem({ name, price, description });
  };

  return (
    <div>
      <form onSubmit={submitFood} className={styles.form}>
        <textarea
          className={styles.textarea}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Food name"
          required
        />
        <textarea
          className={styles.textarea}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit" className={styles.button}>Submit New Item</button>
      </form>
    </div>
    );
};