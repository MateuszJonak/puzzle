import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../store/puzzles/actions';
import {
  getPuzzles,
  getDenormalizedPuzzles,
} from '../../store/puzzles/selectors';
import { Board } from '../Board';
import { PuzzleBox } from '../PuzzleBox';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../../lib/imageConstants';
import './Game.css';

class Game extends Component {
  render() {
    const { puzzles, puzzlesRows, updatePuzzle, updatePositions } = this.props;
    return (
      <div className="game">
        <Board
          puzzlesRows={puzzlesRows}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          updatePuzzle={updatePuzzle}
        />

        <div className="puzzle-box-container">
          <PuzzleBox
            puzzles={puzzles}
            updatePuzzle={updatePuzzle}
            updatePositions={updatePositions}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  puzzlesRows: getDenormalizedPuzzles(state),
  puzzles: getPuzzles(state),
});

const mapDispatchToProps = {
  updatePuzzle: actions.update.puzzle,
  updatePositions: actions.update.positions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
