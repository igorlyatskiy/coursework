import { combineReducers } from '@reduxjs/toolkit';

import { mainReducer } from './main/reducer';
import { State } from "./main/type";

export interface RootReducer {
  mainReducer: State
}

const rootReducer = combineReducers({
  mainReducer
})

export default rootReducer;