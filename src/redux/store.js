import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import { filterReducer } from './filterReducer'
import { sortingReducer } from './sortingReducer'
import { dataReducer } from './dataReducer'
import { userReducer } from './userReducer'

const rootReducer = combineReducers({ filterReducer, sortingReducer, dataReducer, userReducer })
const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: { warnAfter: 300 },
        serializableCheck: { warnAfter: 300 },
      }),
  },
  applyMiddleware(thunk)
)

export default store
