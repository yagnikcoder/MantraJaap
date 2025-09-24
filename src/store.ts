// src/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import mantraJaapCounterSlice from './Slice/mantraJaapCounterSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1) Combine reducers
const rootReducer = combineReducers({
  counter: mantraJaapCounterSlice,
});

// 2) Configure persistence
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// 3) Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4) Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5) Persistor
export const persistor = persistStore(store);

// 6) Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
