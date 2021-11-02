import { combineReducers } from 'redux';

import Flight from './flight';
import User from './User'

export const reducers = combineReducers({ Flight }, { User });