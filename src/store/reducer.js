import { gameTypes } from './types'

const defaultState = {
    imageFile: null,
    tilesInit: [],
    tilesCurrent: [],
    gameOver: false,
}

const gameState = (state = defaultState, action) => {
    switch (action.type) {
        case gameTypes.UPLOAD_FILE:
            return {
                ...state,
                imageFile: action.payload,
            }
        case gameTypes.INIT_TILES:
            return {
                ...state,
                tilesInit: action.payload,
            }
        case gameTypes.SHUFFLED_TILES:
            return {
                ...state,
                tilesCurrent: [
                    ...state.tilesCurrent,
                    action.payload,
                ],
            }
        case gameTypes.GAME_OVER:
            return {
                ...state,
                gameOver: action.payload,
            }
        default:
            return state
    }
}

export default gameState
