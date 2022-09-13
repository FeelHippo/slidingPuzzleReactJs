import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tile from '../components/Tile';
import { moveTile } from '../store/actions';
import { gameStateInterface, AppThunk } from '../store/types';

export class Board extends Component<
    gameMapStateInterface,
    Record<string, unknown>
> {
    constructor(props: gameMapStateInterface) {
        super(props);
    }

    public render() {
        const { tilesCurrent, gameOver } = this.props.gameState;
        return(
            <div>
                {
                    gameOver ? (
                        <img className="board" alt="winner" src={this.props.gameState.imageFile as string} style={{ maxWidth: '80vw' }} />
                    ) : (
                        <div className="board">
                            {
                                tilesCurrent?.length ? (
                                    <div className="board__gameBoard">
                                        {
                                            tilesCurrent[tilesCurrent.length - 1].map((tile, i) => (
                                                <Tile image={tile} position={i} key={i} />
                                            ))
                                        }
                                    </div>
                                ) : (
                                    null
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

interface gameMapStateInterface {
    gameState: gameStateInterface;
}

const mapStateToProps = ({ gameState }: gameMapStateInterface): gameMapStateInterface => ({ gameState });

interface gameDispatchInterface {
    tileClicked: (params: number) => void;
}

const mapDispatchToProps = (dispatch: (action: AppThunk<void>) => void): gameDispatchInterface => ({
    tileClicked: (params: number) => dispatch(moveTile(params)),
});

export default connect<
    gameMapStateInterface, // describes what was returned by mapStateToProps()
    AppThunk<void>, // describes what is returned by dispatchToProps()
    Record<string, unknown>, // component props
    gameMapStateInterface // Apps Redux whole state
>(mapStateToProps, mapDispatchToProps)(Board);