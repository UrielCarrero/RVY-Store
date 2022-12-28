import {combineReducers, applyMiddleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import {Products} from './Products';
import {User} from './User';
import {Cart} from './Cart';
import logger from 'redux-logger';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import * as Types from '../Types';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  products: Products,
  user: User,
  cart: Cart
})

const persistConfig = {
  key: 'root',
  storage: storageSession
 };

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
        reducer : persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(thunk)
      })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)



