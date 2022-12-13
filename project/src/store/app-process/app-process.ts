import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { NameSpace, SortType, INITIAL_CITY, DEFAULT_SORT_TYPE } from '../../utils/constants';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  city: INITIAL_CITY,
  sortType: DEFAULT_SORT_TYPE,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
});

export const {changeCity, changeSortType } = appProcess.actions;
