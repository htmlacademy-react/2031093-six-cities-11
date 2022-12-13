import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../utils/constants';
import { userProcess } from './user-process/user-process';
import { dataProcess } from './data-process/data-process';
import { appProcess } from './app-process/app-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.App]: appProcess.reducer,
});
