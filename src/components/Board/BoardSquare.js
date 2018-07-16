import React from 'react';
import { DropTarget } from 'react-dnd';
import { ITEM_TYPES } from '../Puzzle/constants';
import './BoardSquare.css';

var squareTarget = {
  drop: function(props) {
    console.log('drop');
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const BoardSquare = ({ connectDropTarget, isOver }) =>
  connectDropTarget &&
  connectDropTarget(
    <div
      className="board-square"
      style={{ background: isOver ? 'red' : 'blue' }}
    />,
  );

export default DropTarget(ITEM_TYPES.puzzle, squareTarget, collect)(
  BoardSquare,
);
