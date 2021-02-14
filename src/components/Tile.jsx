import React from 'react';
import { useDispatch } from 'react-redux'
import { moveTile } from '../store/actions'

const Tile = ({ image, position }) => {
    const dispatch = useDispatch();
    return (
        <>
            <img alt="tile" src={image} onClick={() => dispatch(moveTile(position))} />
        </>
    )
}

export default Tile;