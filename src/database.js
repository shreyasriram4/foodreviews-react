import firebaseApp from '../src/firebase.js'; // Import Firestore instance from your firebase.js
import { getFirestore } from 'firebase/firestore';
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc, addDoc, getDocs, query, where, orderBy, limit, arrayUnion } from 'firebase/firestore';

// get db from firebaseApp
const db = getFirestore(firebaseApp);
// Initialize or reset the Firestore database with default food items
export const initializeDefaultDb = async () => {
    console.log("Running initializeDefaultDb")
    const foodItems = [
        { id: '1', name: 'Double Beef Burger', price: '$20', description: 'A ½ lb of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy...', reviews: [] },
        { id: '2', name: 'Spicy Beef Burger', price: '$29', description: 'Three ⅓ lb flame-grilled beef patties with juicy tomatoes, crisp lettuce, creamy mayonnaise...', reviews: [] },
        { id: '3', name: 'Cheese Beef Burger', price: '$26', description: 'A ⅓ lb of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy...', reviews: [] },
        { id: '4', name: 'Chicken Burger', price: '$25', description: 'A ½ lb of flame-grilled chicken patty topped with juicy tomatoes, crisp lettuce, creamy...', reviews: [] }
    ];

    for (const item of foodItems) {
        const foodItemRef = doc(db, "foodItems", item.id);
        // console.log(foodItemRef)
        await setDoc(foodItemRef, item, { merge: true });
    }
};

// Get all food items from the Firestore database
export const getFoodItems = async () => {
    console.log("Getting food items")
    const foodItemsCol = collection(db, "foodItems");
    const snapshot = await getDocs(foodItemsCol);
    return snapshot.docs.map(doc => doc.data());
};

// // Get reviews for a specific food item
export const getReviews = async (foodItemId) => {
    console.log(foodItemId)
    const docRef = doc(db, "foodItems", foodItemId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().reviews) {
        return docSnap.data().reviews;
    }
    return [];
};

// Create a review for a specific food item
export const createReviewForFoodItem = async (foodItemId, review) => {
    const foodItemRef = doc(db, "foodItems", foodItemId);
    const foodItemSnap = await getDoc(foodItemRef);
    console.log(foodItemRef)
    // create the review associated with the food item
    const newReview = {
        ...review,
        timestamp: new Date().toISOString(),
    };
    await updateDoc(foodItemRef, {
        reviews: arrayUnion(newReview)
    });

    // add the review to the reviews collection
    const reviewsCollection = collection(db, 'reviews');
    // add an upvotes field to the review
    const leaderBoardReview = {
        text: review.review,
        food: foodItemSnap.data().name,
        upvotes: 0
    }
    await addDoc(reviewsCollection, leaderBoardReview, { merge: true });
    return newReview;
};

// Add a new food item
export const createFoodItem = async (foodItem) => {
    const foodItemRef = doc(collection(db, "foodItems"));
    await setDoc(foodItemRef, { ...foodItem, id: foodItemRef.id, reviews: [] });
    return { id: foodItemRef.id, ...foodItem };
};

// Delete a food item
export const deleteFoodItem = async (foodItemId) => {
    const foodItemRef = doc(db, "foodItems", foodItemId);
    await deleteDoc(foodItemRef);
};

// Upvote a review
export const upvoteReview = async (reviewId) => {
    console.log('TESTING UPVOTE REVIEW')
    console.log(reviewId);
    const reviewRef = doc(db, 'reviews', reviewId);
    const reviewSnap = await getDoc(reviewRef);
    if (reviewSnap.exists()) {
        await updateDoc(reviewRef, {
            upvotes: reviewSnap.data().upvotes + 1
        });
    }
};

export const getAllReviews = async () => {

    // retrieve the update reviews
    const reviewsCollection = collection(db, 'reviews');
    const reviewsSnapshot = await getDocs(reviewsCollection);

    const reviews = reviewsSnapshot.docs.map(doc =>
    ({
        id: doc.id,
        ...doc.data()
    }));
    return reviews;
}