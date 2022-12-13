import { SyntheticEvent, useState, useRef } from 'react';

import { useAppSelector } from '../../hooks';
import { getOffer } from '../../store/data-process/selectors';
import { store } from '../../store/index';
import { FormPostData } from '../../types/types';
import { Rating } from '../../utils/constants';
import { postNewOfferComment } from '../../store/api-actions';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

function ReviewForm(): JSX.Element {
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  const offer = useAppSelector(getOffer);
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });

  const handleSubmitButtonAvailability = () => {
    if (submitButtonRef.current && formData.comment && formData.comment.length >= MIN_COMMENT_LENGTH
      && formData.comment.length <= MAX_COMMENT_LENGTH && formData.rating) {

      submitButtonRef.current.removeAttribute('disabled');
    } else {
      submitButtonRef.current?.setAttribute('disabled', 'true');
    }
  };

  const handleCommentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      rating: formData.rating,
      comment: evt.target.value,
    });
    handleSubmitButtonAvailability();
  };

  const HandleRadioToggle = (evt: SyntheticEvent<HTMLInputElement>) => {
    setFormData({
      rating: Number(evt.currentTarget.value) as Rating,
      comment: formData.comment,
    });
    handleSubmitButtonAvailability();
  };

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();

    if (offer && offer.id) {
      const formPostData: FormPostData = {
        offerId: offer.id,
        formData,
      };
      store.dispatch(postNewOfferComment(formPostData));
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input onChange={HandleRadioToggle} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"></input>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={HandleRadioToggle} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"></input>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={HandleRadioToggle} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"></input>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={HandleRadioToggle} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"></input>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={HandleRadioToggle} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"></input>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleCommentChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button ref={submitButtonRef} className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
