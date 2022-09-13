import * as React from 'react';
import { useAppDispatch } from '../store/hooks';
import { moveTile } from '../store/actions'

const Tile = ({ image, position }: {image: string, position: number}) => {
    const dispatch = useAppDispatch();
    return (
        <>
            <img alt="tile" src={image} onClick={() => dispatch(moveTile(position))} />
        </>
    )
}

export default Tile;