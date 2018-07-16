import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Board } from '../Board';
import { PuzzleBox } from '../PuzzleBox';
import './Game.css';

class Game extends Component {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="game">
          <Board />

          <div className="puzzle-box-container">
            <PuzzleBox />
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default Game;
