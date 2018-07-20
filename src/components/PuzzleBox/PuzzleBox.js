import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ITEM_TYPES } from '../../lib/itemTypes';
import { Puzzle } from '../Puzzle';
import { TrackClientRect } from '../TrackClientRect';
import { PUZZLE_BOX_RECT_NAME } from '../../store/ui/selectors';
import './PuzzleBox.css';

const puzzleBoxTarget = {
  drop: function(props, monitor, component) {
    if (!component) {
      return;
    }
    const item = monitor.getItem();
    const sourceClientOffset = monitor.getSourceClientOffset();

    props.onDrop(item.id, sourceClientOffset);
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class PuzzleBox extends Component {
  render() {
    const { connectDropTarget } = this.props;
    return (
      connectDropTarget &&
      connectDropTarget(
        <div className="puzzle-box-container">
          <TrackClientRect
            as="div"
            name={PUZZLE_BOX_RECT_NAME}
            className="puzzle-box">
            {this.renderPuzzles()}
          </TrackClientRect>
        </div>,
      )
    );
  }

  renderPuzzles() {
    const { handleBeginDrag, puzzles } = this.props;
    return puzzles.map(
      puzzle =>
        !puzzle.isMatched && (
          <Puzzle
            key={puzzle.id}
            {...puzzle}
            hideSourceOnDrag
            onBeginDrag={handleBeginDrag}
          />
        ),
    );
  }
}

export default DropTarget(ITEM_TYPES.puzzle, puzzleBoxTarget, collect)(
  PuzzleBox,
);
