import { createSlice, PayloadAction  } from '@reduxjs/toolkit'
import { RootState } from './store';
import { gameStateInterface } from './types'

const initialState: gameStateInterface = {
    imageFile: null,
    tilesInit: [],
    tilesCurrent: [],
    gameOver: false,
}

export const gameState = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        upload: (state, action: PayloadAction<string>) => { state.imageFile = action.payload },
        init: (state, action: PayloadAction<string[]>) => { state.tilesInit = action.payload },
        shuffle: (state, action: PayloadAction<string[]>) => { state.tilesCurrent = [ ...state.tilesCurrent, action.payload ] },
        gameover: (state, action: PayloadAction<boolean>) => { state.gameOver = action.payload },
    },
});

export const { upload, init, shuffle, gameover } = gameState.actions;
export const selectState = (state: RootState) => state.gameState;
export default gameState.reducer; 
