import { gameTypes } from './types';
import shuffleArray from '../utils/shuffleArray';
import { imageToBase64, base64ToTiles, moveClickedTile, compareArrays } from '../utils/imageUtils';

export const uploadFile = file => {
    return async dispatch => {
        // convert "file" object toDataUrl
        const imageBase64 = await imageToBase64(file);
        dispatch(saveImageFile(imageBase64))
        // convert and split the image, save copy to tilesInit (winner state) and tilesCurrent (shuffled)
        const tiles = await base64ToTiles(imageBase64);
        dispatch(saveInitialTiles(tiles))
        // shuffle tiles here
        const shuffledTiles = shuffleArray(tiles);
        dispatch(saveShuffledTiles(shuffledTiles));
    }
}

const saveImageFile = image => ({
    type: gameTypes.UPLOAD_FILE,
    payload: image,
})

const saveInitialTiles = tiles => ({
    type: gameTypes.INIT_TILES,
    payload: tiles,
})

const saveShuffledTiles = tiles => ({
    type: gameTypes.SHUFFLED_TILES,
    payload: tiles,
})

export const moveTile = position => {
    return (dispatch, getState) => {
        const currentBoard = getState().tilesCurrent[getState().tilesCurrent.length - 1];
        const winnerBoard = getState().tilesInit;
        // move tile to adjacent empty cell
        const updatedBoard = moveClickedTile(currentBoard, position);
        // dispatch saveShuffledTiles with new array
        dispatch(saveShuffledTiles(updatedBoard));
        // see if new status is the winner's
        const hasPlayerWon = compareArrays(updatedBoard, winnerBoard)
        if (hasPlayerWon) dispatch(playerWon(true))
    }
}

const playerWon = success => ({
    type: gameTypes.GAME_OVER,
    payload: success,
})