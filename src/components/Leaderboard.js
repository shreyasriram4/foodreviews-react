// components/Leaderboard.js
import React, { useEffect, useState } from "react";
import styles from "../styles/Leaderboard.module.css";
import * as db from "../database";

export default function Leaderboard() {
  const [reviews, setReviews] = useState([]);

  const getSortedReviews = async () => {
    const allReviews = await db.getAllReviews();

    // Sort reviews by the number of upvotes in descending order
    const sortedReviews = allReviews
      .slice()
      .sort((a, b) => b.upvotes - a.upvotes);
    // const reviewCounts = {}
    setReviews(sortedReviews);
    console.log(allReviews);
  };

  useEffect(() => {
    getSortedReviews();
  }, []);

  const handleUpvote = async (reviewId) => {
    console.log("reviewId", reviewId);
    // Update the upvotes count in the database
    await db.upvoteReview(reviewId);

    // Refresh the reviews after upvoting
    getSortedReviews();
  };

  return (
    <div className={styles.leaderboard}>
      <h1 className={styles.title}>Food Leaderboard&#128204;</h1>
      {
        <ul className={styles.list}>
          <li
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              backgroundColor: "#a5b1f4",
            }}
            className={`${styles.listItem} ${styles.header}`}
          >
            <span>FOOD ITEM&#129351;</span>
            <span>REVIEW&#127839; </span>
            <span>NUM UPVOTES&#128200; </span>
            <p>UPVOTE&#9757; </p>
          </li>
          {reviews.map((item, index) => (
            <li key={index} className={styles.listItem}>
              <span>{item.food}</span>
              <span>{item.text} </span>
              <span>{item.upvotes} </span>
              <button className={styles.upvoteButton} onClick={() => handleUpvote(item.id)}>UPVOTE</button>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
