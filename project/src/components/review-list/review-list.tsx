import { useAppSelector } from '../../hooks';
import { Comment } from '../../types/types';
import ReviewCard from '../../components/review-card/review-card';

function ReviewList(): JSX.Element {
  const comments: Comment[] = useAppSelector((state) => state.comments);

  return (
    <ul className="reviews__list">
      {comments.map((comment) => <ReviewCard comment={comment} key={comment.id} /> )}
    </ul>
  );
}

export default ReviewList;
