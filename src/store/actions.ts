import { upload, init, shuffle, gameover } from './reducer';
import { AppThunk } from './types';
import shuffleArray from '../utils/shuffleArray';
import { imageToBase64, base64ToTiles, moveClickedTile, compareArrays } from '../utils/imageUtils';

export const uploadFile = (file: File): AppThunk =>
    async dispatch => {
        // convert "file" object toDataUrl
        const imageBase64 = await imageToBase64(file);
        dispatch(upload(imageBase64))
        // convert and split the image, save copy to tilesInit (winner state) and tilesCurrent (shuffled)
        const tiles = await base64ToTiles(imageBase64);
        dispatch(init(tiles));
        // shuffle tiles here
        const shuffledTiles = shuffleArray(tiles);
        dispatch(shuffle(shuffledTiles));
    };

export const moveTile = (position: number): AppThunk =>
    (dispatch, getState) => {
        const currentBoard = getState()
            .gameState
            .tilesCurrent[getState().gameState.tilesCurrent.length - 1];
        const winnerBoard = getState()
            .gameState
            .tilesInit;
        // move tile to adjacent empty cell
        const updatedBoard = moveClickedTile(currentBoard, position);
        // dispatch saveShuffledTiles with new array
        dispatch(shuffle(updatedBoard));
        // see if new status is the winner's
        const hasPlayerWon = compareArrays(updatedBoard, winnerBoard)
        if (hasPlayerWon) dispatch(gameover(true));
    };