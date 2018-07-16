import React from 'react';
import { DropTarget } from 'react-dnd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import actions from '../../store/puzzles/actions';
import { ITEM_TYPES } from '../Puzzle/constants';
import { Puzzle } from '../Puzzle';
import './PuzzleBox.css';

const puzzleBoxTarget = {
  drop: function(props, monitor, component) {
    if (!component) {
      return;
    }
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveBox({ id: item.id, left, top });
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class PuzzleBox extends React.Component {
  moveBox({ id, left, top }) {
    const { puzzles } = this.props;

    const newPuzzles = puzzles.map(puzzle => {
      if (puzzle.id === id) {
        return {
          ...puzzle,
          left,
          top,
        };
      }
      return puzzle;
    });
    this.props.updatePuzzles(newPuzzles);
  }

  render() {
    const { connectDropTarget } = this.props;
    return (
      connectDropTarget &&
      connectDropTarget(
        <div className="puzzle-box">{this.renderPuzzles()}</div>,
      )
    );
  }

  renderPuzzles() {
    return this.props.puzzles.map(puzzle => (
      <Puzzle key={puzzle.id} {...puzzle} hideSourceOnDrag />
    ));
  }
}

const mapStateToProps = state => ({
  puzzles: state.puzzles,
});

const mapDispatchToProps = {
  updatePuzzles: actions.puzzles.update,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  DropTarget(ITEM_TYPES.puzzle, puzzleBoxTarget, collect),
)(PuzzleBox);
