import React, { Component } from 'react';
import { Board } from '../Board';
import { TilesBox } from '../TilesBox';
import GameController from './GameController';
import './Game.css';

class Game extends Component {
  render() {
    return (
      <GameController>
        {({ gameStart, gameFinish, gameReset, duration }) => (
          <div className="game">
            <div className="game-timer">
              <h2>{duration}</h2>
            </div>
            <div className="actions-container">
              <button className="btn btn-regular" onClick={() => gameReset()}>
                restart
              </button>
            </div>
            <div className="board-container">
              <Board onFillEnd={gameFinish} />
            </div>
            <div className="tiles-box-container">
              <TilesBox onBeginFirstDrag={gameStart} />
            </div>
          </div>
        )}
      </GameController>
    );
  }
}

export default Game;
