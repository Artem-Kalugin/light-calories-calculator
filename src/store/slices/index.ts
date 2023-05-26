import { combineReducers } from '@reduxjs/toolkit';

import app from './app';
import history from './history';
import products from './products';

export default combineReducers({
  app,
  products,
  history,
});
