import { Comment } from '../../types/types';

import { getShortTDate } from '../../utils/utils';

type ReviewCardProps = {
  comment: Comment;
}

function ReviewCard({ comment }: ReviewCardProps): JSX.Element {
  const ratingStyle = {
    width: `${Math.round(comment.rating) * 20}%`,
  };
  const date = getShortTDate(comment.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar"></img>
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={ratingStyle}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime={`${date}`}>{date}</time>
      </div>
    </li>
  );
}

export default ReviewCard;
