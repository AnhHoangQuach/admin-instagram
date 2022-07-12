import { configureStore } from '@reduxjs/toolkit';
import profile from './profile';
import notification from './notification';

export const store = configureStore({
  reducer: { profile, notification },
});

export type RootState = ReturnType<typeof store.getState>;
