import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { ITEM_TYPES } from '../../lib/itemTypes';
import { Puzzle } from '../Puzzle';
import './PuzzleBox.css';

const puzzleBoxTarget = {
  drop: function(props, monitor, component) {
    if (!component) {
      return;
    }
    const item = monitor.getItem();
    const sourceClientOffset = monitor.getSourceClientOffset();

    component.moveBox(item.id, sourceClientOffset);
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class PuzzleBox extends Component {
  constructor(props) {
    super(props);

    this.puzzleBoxRef = React.createRef();
  }

  getPuzzleBoxClientRect() {
    return findDOMNode(this.puzzleBoxRef.current).getBoundingClientRect();
  }

  moveBox(id, sourceClientOffset) {
    const puzzleBoxClientRect = this.getPuzzleBoxClientRect();
    const positions = {
      left: sourceClientOffset.x - puzzleBoxClientRect.left,
      top: sourceClientOffset.y - puzzleBoxClientRect.top,
    };

    this.props.updatePuzzle(id, { ...positions, isMatched: false });
  }

  render() {
    const { connectDropTarget } = this.props;
    return (
      connectDropTarget &&
      connectDropTarget(
        <div className="puzzle-box-container">
          <div className="puzzle-box" ref={this.puzzleBoxRef}>
            {this.renderPuzzles()}
          </div>
        </div>,
      )
    );
  }

  renderPuzzles() {
    return this.props.puzzles.map(
      puzzle =>
        !puzzle.isMatched && (
          <Puzzle key={puzzle.id} {...puzzle} hideSourceOnDrag />
        ),
    );
  }
}

export default DropTarget(ITEM_TYPES.puzzle, puzzleBoxTarget, collect)(
  PuzzleBox,
);
