import React, { Component } from 'react';
import { Board } from '../Board';
import { PuzzleBox } from '../PuzzleBox';
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

            <div className="puzzle-box-container">
              <PuzzleBox onBeginFirstDrag={gameStart} />
            </div>
          </div>
        )}
      </GameController>
    );
  }
}

export default Game;
