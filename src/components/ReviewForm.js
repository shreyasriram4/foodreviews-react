// components/ReviewForm.js
import React, { useEffect, useState } from 'react';
import styles from '../styles/ReviewForm.module.css'; // Assume CSS module for styling
import firebase from 'firebase/app'; // Import Firebase
import 'firebase/firestore'; // Import Firestore
import { useRouter } from 'next/router';
import * as db from '../database';

export default function ReviewForm({ foodItemId }) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Function to fetch reviews associated with the food item
  const getFoodReviews = async () => {
     const allReviews = await db.getReviews(foodItemId)
     setReviews(allReviews);
     console.log('Reviews????')
     console.log(allReviews);
  };

  useEffect(() => {
    getFoodReviews();
  }, []); // TODO: what should be the dependency array?

  const submitReview = async (e) => {
    e.preventDefault();
    await db.createReviewForFoodItem(foodItemId, { review, rating });
    // onSubmit({ review, rating });
    setReview('');
    setRating(0);
    // Refresh the reviews list after submitting the review
    getFoodReviews();
  };

  return (
    <div>
      <form  className={styles.form} onSubmit={submitReview}>
      <h2 className={styles.h2}> Write a Review </h2>
        <textarea
          className={styles.textarea}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          required
        />
        <label style={{color: "#fff"}}>Rating: 1 - 5</label>
        <input
          style={{width: "50px", padding: "5px", }}
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          required
        />
        <button type="submit" className={styles.submitButton}>Submit Review</button>
      </form>
      <h2 style={{color:'#fff', textAlign: 'center', marginTop: '35px', padding: '10px'}}>Reviews:</h2>
      <div style={{maxHeight: "400px", overflowY: "auto"}}>
        {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              margin: "auto",
              marginBottom: "10px",
              marginTop: "10px",
              borderRadius: "10px",
              width: "80%",
            }}
          >
            <p>{review.review}</p>
            <p>{review.rating}</p>
            <p>{review.timestamp}</p>
          </div>
        ))
      ) : (
        <p>No Reviews Yet!</p>
      )}
      </div>
    </div>
  );
};