import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../../store/puzzles/actions';
import { getPuzzlesFlatten, getPuzzles } from '../../store/puzzles/selectors';
import { Board } from '../Board';
import { PuzzleBox } from '../PuzzleBox';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../../lib/imageConstants';
import './Game.css';

class Game extends Component {
  render() {
    const { puzzles, puzzlesFlatten, updatePuzzle } = this.props;
    return (
      <div className="game">
        <Board
          puzzlesRows={puzzles}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          updatePuzzle={updatePuzzle}
        />

        <div className="puzzle-box-container">
          <PuzzleBox puzzles={puzzlesFlatten} updatePuzzle={updatePuzzle} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  puzzles: getPuzzles(state),
  puzzlesFlatten: getPuzzlesFlatten(state),
});

const mapDispatchToProps = {
  updatePuzzle: actions.update.puzzle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
