import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ITEM_TYPES } from '../../lib/itemTypes';
import './Puzzle.css';

const puzzleSource = {
  beginDrag: (
    { id, left, top, onBeginDrag = () => {} },
    monitor,
    component,
  ) => {
    if (!component) {
      return;
    }

    onBeginDrag();
    return {
      id,
      left,
      top,
    };
  },
};

const collect = (connect, monitor) => ({
  connectDragPreview: connect.dragPreview(),
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

class Puzzle extends Component {
  render() {
    const {
      id,
      left,
      top,
      width,
      height,
      style,
      backgroundPosition,
      hideSourceOnDrag,
      connectDragPreview,
      connectDragSource,
      isDragging,
    } = this.props;
    if (isDragging && hideSourceOnDrag) {
      return null;
    }

    return (
      connectDragPreview &&
      connectDragSource &&
      connectDragPreview(
        connectDragSource(
          <div
            className="puzzle"
            style={{
              left,
              top,
              width,
              height,
              background: `url("/0.jpeg") ${backgroundPosition.join(' ')}`,
              ...style,
            }}>
            {id}
          </div>,
        ),
      )
    );
  }
}

Puzzle.defaultProps = {
  onBeginDrag: () => {},
};

export default DragSource(ITEM_TYPES.puzzle, puzzleSource, collect)(Puzzle);
