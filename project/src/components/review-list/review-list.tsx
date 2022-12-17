import { Comment } from '../../types/types';
import ReviewCard from '../../components/review-card/review-card';
import { MAX_OFFER_REVIEWS_QUANTITY } from '../../utils/constants';
import { shuffle, getDateDifferenceInSeconds } from '../../utils/utils';

type ReviewListProps = {
  comments: Comment[];
}

function ReviewList({ comments }: ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {shuffle(comments)
        .slice(0, MAX_OFFER_REVIEWS_QUANTITY)
        .sort((c1, c2) => -1 * getDateDifferenceInSeconds(c1.date, c2.date))
        .map((comment) => <ReviewCard comment={comment} key={comment.id} /> )}
    </ul>
  );
}

export default ReviewList;
