import { SyntheticEvent, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/index';
import { getSortType } from '../../store/app-process/selectors';
import { changeSortType } from '../../store/app-process/app-process';
import { debounce } from '../../utils/utils';
import * as Const from '../../utils/constants';

const DEBOUNCE_MILLISECONDS = 200;
const SORT_LIST_CLASS_ACTIVE = 'places__option--active';
const SORT_LIST_CLASS_OPENED = 'places__options--opened';

function SortList(): JSX.Element {
  const dispacth = useAppDispatch();
  const oldSortType = useAppSelector(getSortType);
  const sortListRef = useRef<HTMLUListElement | null>(null);

  const handleSortingTypeMouseEnter = () => {
    const sortListElement = sortListRef.current;
    if (sortListElement && !sortListElement.classList.contains(SORT_LIST_CLASS_OPENED)) {
      sortListElement.classList.add(SORT_LIST_CLASS_OPENED);
    }
  };

  const handleSortingTypeMouseLeave = () => {
    const sortListElement = sortListRef.current;
    if (sortListElement && sortListElement.classList.contains(SORT_LIST_CLASS_OPENED)) {
      sortListElement.classList.remove(SORT_LIST_CLASS_OPENED);
    }
  };

  const handleSortTypeClick = (evt: SyntheticEvent<HTMLElement>) => {
    const sortType = evt.currentTarget.dataset.sortType as Const.SortType;
    if (sortType && sortType !== oldSortType) {
      dispacth(changeSortType(sortType));
    }

    const sortListElement = sortListRef.current;
    if (sortListElement) {
      sortListElement?.querySelectorAll(`.${SORT_LIST_CLASS_ACTIVE}`).forEach((item) => {
        item.classList.remove(SORT_LIST_CLASS_ACTIVE);
      });
    }

    evt.currentTarget.classList.add(SORT_LIST_CLASS_ACTIVE);
    const sortListSelectedTypeElement = document.querySelector('.places__sorting-type');
    if (sortListSelectedTypeElement) {
      sortListSelectedTypeElement.textContent = evt.currentTarget.textContent;
    }
    handleSortingTypeMouseLeave();
  };

  return (
    <form className="places__sorting" action="#" method="get"
      onMouseLeave={debounce(handleSortingTypeMouseLeave, DEBOUNCE_MILLISECONDS)}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type"
        onMouseEnter={handleSortingTypeMouseEnter}
        tabIndex={0}
      >
        {useAppSelector(getSortType)}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul ref={sortListRef} className="places__options places__options--custom">
        <li onClick={handleSortTypeClick} data-sort-type={Const.SortType.Popular} className="places__option places__option--active" tabIndex={0}>Popular</li>
        <li onClick={handleSortTypeClick} data-sort-type={Const.SortType.PriceLowToHigh} className="places__option" tabIndex={0}>Price: low to high</li>
        <li onClick={handleSortTypeClick} data-sort-type={Const.SortType.PriceHighToLow} className="places__option" tabIndex={0}>Price: high to low</li>
        <li onClick={handleSortTypeClick} data-sort-type={Const.SortType.TopRatedFirst} className="places__option" tabIndex={0}>Top rated first</li>
      </ul>
    </form>
  );
}

export default SortList;
