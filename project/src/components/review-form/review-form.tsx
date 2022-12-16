import { SyntheticEvent, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { getOffer, getIsNewCommentDataPosting, getReviewPostStatus } from '../../store/data-process/selectors';
import { FormPostData } from '../../types/types';
import { Rating, ReviewPostStatus, NEW_REVIEW_POST_ERROR } from '../../utils/constants';
import { postNewOfferComment } from '../../store/api-actions';
import { dataProcess } from '../../store/data-process/data-process';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const ratingOneRef = useRef<HTMLInputElement | null>(null);
  const ratingTwoRef = useRef<HTMLInputElement | null>(null);
  const ratingThreeRef = useRef<HTMLInputElement | null>(null);
  const ratingFourRef = useRef<HTMLInputElement | null>(null);
  const ratingFiveRef = useRef<HTMLInputElement | null>(null);

  const offer = useAppSelector(getOffer);
  const isNewCommentDataPosting = useAppSelector(getIsNewCommentDataPosting);
  const reviewPostStatus = useAppSelector(getReviewPostStatus);

  const ratingRefs = useMemo(() => [
    ratingOneRef,
    ratingTwoRef,
    ratingThreeRef,
    ratingFourRef,
    ratingFiveRef,
  ], [ratingOneRef, ratingTwoRef, ratingThreeRef, ratingFourRef, ratingFiveRef]);

  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });

  const showToastReviewPostErrorMessage = () => {
    toast.warning(NEW_REVIEW_POST_ERROR, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const resetReviewForm = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
    ratingRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.checked = false;
      }
    });
  }, [textareaRef, ratingRefs]);

  useEffect(() => {
    if (formData.comment.length >= MIN_COMMENT_LENGTH
      && formData.comment.length <= MAX_COMMENT_LENGTH
      && formData.rating) {
      submitButtonRef.current?.removeAttribute('disabled');
    } else {
      submitButtonRef.current?.setAttribute('disabled', 'true');
    }
  }, [dispatch, formData]);

  useEffect(() => {
    if (isNewCommentDataPosting) {
      switch (reviewPostStatus) {
        case ReviewPostStatus.Fulfilled:
          resetReviewForm();
          break;

        case ReviewPostStatus.Rejected:
          showToastReviewPostErrorMessage();
          break;

        default:
          break;
      }
      dataProcess.actions.resetIsNewCommentDataPosting();
    }
  }, [isNewCommentDataPosting, reviewPostStatus, resetReviewForm]);

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

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();

    if (offer && offer.id) {
      const formPostData: FormPostData = {
        offerId: offer.id,
        formData,
      };
      dispatch(postNewOfferComment(formPostData));
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="reviews__form form" action="#" method="post"
        onSubmit={handleSubmit}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input ref={ratingFiveRef} onChange={HandleRadioToggle} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"></input>
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input ref={ratingFourRef} onChange={HandleRadioToggle} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"></input>
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input ref={ratingThreeRef} onChange={HandleRadioToggle} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"></input>
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input ref={ratingTwoRef} onChange={HandleRadioToggle} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"></input>
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input ref={ratingOneRef} onChange={HandleRadioToggle} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"></input>
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
    </>
  );
}

export default ReviewForm;
