import { Comment } from '../../types/types';
import ReviewCard from '../../components/review-card/review-card';

type ReviewListProps = {
  comments: Comment[];
}

function ReviewList({ comments }: ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {comments.map((comment) => <ReviewCard comment={comment} key={comment.id} /> )}
    </ul>
  );
}

export default ReviewList;
