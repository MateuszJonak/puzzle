import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ITEM_TYPES } from '../../lib/itemTypes';
import './BoardField.css';

const fieldTarget = {
  drop: function(props, monitor, component) {
    if (!component) {
      return;
    }
    const item = monitor.getItem();

    component.onDrop(item.id);
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class BoardField extends Component {
  onDrop(id) {
    if (id === this.props.id) {
      this.props.updateTile(id, { isMatched: true });
      this.props.onFill();
    }
  }

  render() {
    const { width, height, children, connectDropTarget, isOver } = this.props;
    return (
      connectDropTarget &&
      connectDropTarget(
        <div
          className="board-field"
          style={{ width, height, background: isOver ? 'red' : 'blue' }}>
          {children}
        </div>,
      )
    );
  }
}

export default DropTarget(ITEM_TYPES.tile, fieldTarget, collect)(BoardField);
