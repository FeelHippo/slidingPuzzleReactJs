import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tile from '../components/Tile';
import { moveTile } from '../store/actions';

export class Board extends Component {
    constructor() {
        super()
        this.state = {
            winner: false,
        }
    }

    componentDidMount() {
        if (this.props.gameOver) this.setState({
            winner: true,
        })
    }

    render() {
        const { tilesCurrent } = this.props
        return(
            <div>
                {
                    this.state.winner ? (
                        <image alt="winner" src={this.props.imageFile} />
                    ) : (
                        <div className="board">
                            {
                                tilesCurrent.length ? (
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

const mapStateToProps = state => {
    return {
        imageFile: state.imageFile,
        tilesInit: state.tilesInit,
        tilesCurrent: state.tilesCurrent,
        gameOver: state.gameOver,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        tileClicked: params => dispatch(moveTile(params)), // params = {tilesCurrent, idClicked}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);