import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../../lib/imageConstants';
import actions from '../../store/puzzles/actions';
import { getDenormalizedPuzzles } from '../../store/puzzles/selectors';

class BoardContainer extends Component {
  handleFill = () => {
    const { puzzlesRows, onFillEnd } = this.props;
    const isFillEnd = puzzlesRows.every(puzzleRow =>
      puzzleRow.every(puzzle => puzzle.isMatched),
    );
    if (isFillEnd) {
      onFillEnd();
    }
  };

  render() {
    const { onFillEnd, ...restProps } = this.props;
    return (
      <Board
        onFill={this.handleFill}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        {...restProps}
      />
    );
  }
}

const mapStateToProps = state => ({
  puzzlesRows: getDenormalizedPuzzles(state),
});

const mapDispatchToProps = {
  updatePuzzle: actions.update.puzzle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer);
