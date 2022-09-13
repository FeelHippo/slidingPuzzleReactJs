import { AnyAction } from 'redux';
import { RootState } from './store';
import { ThunkAction } from 'redux-thunk';

export interface gameStateInterface {
    imageFile: string | ArrayBuffer | null,
    tilesInit: string[],
    tilesCurrent: string[][],
    gameOver: boolean,
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>