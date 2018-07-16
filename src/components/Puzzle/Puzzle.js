import React from 'react';
import { DragSource } from 'react-dnd';

import { ITEM_TYPES } from './constants';
import './Puzzle.css';

var puzzleSource = {
  beginDrag: function(props) {
    return {};
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const Puzzle = ({ id, isDragging, connectDragSource }) => {
  return (
    connectDragSource &&
    connectDragSource(
      <div className="puzzle" style={{ opacity: isDragging ? 0.5 : 1 }}>
        {id}
      </div>,
    )
  );
};

export default DragSource(ITEM_TYPES.puzzle, puzzleSource, collect)(Puzzle);
