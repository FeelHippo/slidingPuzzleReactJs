import { configureStore } from '@reduxjs/toolkit';
import gameState from './reducer';

export const store = configureStore({
    reducer: {
        gameState,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;