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
            <button onClick={() => gameReset()}>restart</button>
            <Board onFillEnd={gameFinish} />

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
