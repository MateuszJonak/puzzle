import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getPuzzles } from '../../store/puzzles/selectors';
import { getPuzzleBoxRect } from '../../store/ui/selectors';
import { getIsRunning } from '../../store/game/selectors';
import actions from '../../store/puzzles/actions';
import PuzzleBox from './PuzzleBox';
import './PuzzleBox.css';

class PuzzleBoxContainer extends Component {
  handleBeginDrag = () => {
    if (!this.props.isRunning) {
      this.props.onBeginFirstDrag();
    }
  };

  handleDrop = (id, sourceClientOffset) => {
    const { puzzleBoxRect, updatePuzzle } = this.props;
    if (!puzzleBoxRect) {
      return;
    }
    const positions = {
      left: sourceClientOffset.x - puzzleBoxRect.left,
      top: sourceClientOffset.y - puzzleBoxRect.top,
    };
    updatePuzzle(id, { ...positions, isMatched: false });
  };

  render() {
    return (
      <PuzzleBox
        puzzles={this.props.puzzles}
        onDrop={this.handleDrop}
        handleBeginDrag={this.handleBeginDrag}
      />
    );
  }
}

const mapStateToProps = state => ({
  isRunning: getIsRunning(state),
  puzzles: getPuzzles(state),
  puzzleBoxRect: getPuzzleBoxRect(state),
});

const mapDispatchToProps = {
  updatePuzzle: actions.update.puzzle,
  positionsCalcalute: actions.positions.calculate,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PuzzleBoxContainer);
