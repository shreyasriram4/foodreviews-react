// pages/write-review.js
import ReviewForm from '../components/ReviewForm';

const WriteReviewPage = ({ foodItemId }) => {
  return <ReviewForm foodItemId={foodItemId} />;
};

WriteReviewPage.getInitialProps = ({ query }) => {
  const { foodItemId } = query;
  return { foodItemId };
};

export default WriteReviewPage;
