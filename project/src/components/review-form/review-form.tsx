import { SyntheticEvent, useState, useRef, useEffect, useCallback } from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { getOffer } from '../../store/data-process/selectors';
import { FormPostData } from '../../types/types';
import { Rating } from '../../utils/constants';
import { postNewOfferComment } from '../../store/api-actions';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const offer = useAppSelector(getOffer);
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });


  useEffect(() => {
    if (formData.comment.length >= MIN_COMMENT_LENGTH
      && formData.comment.length <= MAX_COMMENT_LENGTH
      && formData.rating) {
      submitButtonRef.current?.removeAttribute('disabled');
    } else {
      submitButtonRef.current?.setAttribute('disabled', 'true');
    }
  }, [dispatch, formData]);

  const handleCommentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      comment: evt.target.value,
    });
  };

  const HandleRadioToggle = (evt: SyntheticEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      rating: Number(evt.currentTarget.value) as Rating,
    });
  };

  const updateData = useCallback(async <T, >(p: Promise<T>, callback: () => void) => {
    try {
      await p;
      callback();
    } catch (error) {
      //TODO show error to user
    }
  }, [dispatch]);

  const updateReviewForm = () => {
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
  };

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();

    if (offer && offer.id) {
      const formPostData: FormPostData = {
        offerId: offer.id,
        formData,
      };
      updateData(dispatch(postNewOfferComment(formPostData)), updateReviewForm);
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
      <textarea ref={textareaRef} className="reviews__textarea form__textarea" id="review" name="review"
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
