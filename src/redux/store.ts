import { configureStore } from '@reduxjs/toolkit';
import characters from './feature/characters';

export const store = configureStore({
  reducer: {
    characters,
  },
});

export type RootState = ReturnType<typeof store.getState>;
