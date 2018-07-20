import React, { Component } from 'react';
import BoardField from './BoardField';
import { Puzzle } from '../Puzzle';
import './Board.css';

class Board extends Component {
  render() {
    const { width, height } = this.props;
    return (
      <div className="board" style={{ width, height }}>
        {this.renderPuzzlesRows()}
      </div>
    );
  }

  renderPuzzlesRows() {
    const { puzzlesRows } = this.props;

    return puzzlesRows.map((puzzlesRow, index) => (
      <div key={index} className="board-row">
        {this.renderPuzzles(puzzlesRow)}
      </div>
    ));
  }

  renderPuzzles(puzzlesRow) {
    const { updatePuzzle, onFill } = this.props;
    return puzzlesRow.map(puzzle => (
      <BoardField
        key={puzzle.id}
        id={puzzle.id}
        updatePuzzle={updatePuzzle}
        onFill={onFill}
        width={puzzle.width}
        height={puzzle.height}>
        {puzzle.isMatched && (
          <Puzzle {...puzzle} hideSourceOnDrag style={{ position: 'static' }} />
        )}
      </BoardField>
    ));
  }
}

export default Board;
