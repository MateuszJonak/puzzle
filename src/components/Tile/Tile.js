import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { BORDER_WIDTH } from '../../lib/imageConstants';
import { ITEM_TYPES } from '../../lib/itemTypes';
import './Tile.css';

const tileSource = {
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
  canDrag: ({ stopDrag }) => !stopDrag,
};

const collect = (connect, monitor) => ({
  connectDragPreview: connect.dragPreview(),
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

class Tile extends Component {
  render() {
    const {
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
            className="tile"
            style={{
              left,
              top,
              width: width - 2 * BORDER_WIDTH,
              height: height - 2 * BORDER_WIDTH,
              borderWidth: BORDER_WIDTH,
              borderStyle: 'solid',
              borderColor: '#bc3e2b',
              background: `url("/0.jpeg") ${backgroundPosition
                .map(value => `${value - BORDER_WIDTH}px`)
                .join(' ')}`,
              ...style,
            }}
          />,
        ),
      )
    );
  }
}

Tile.defaultProps = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  style: {},
  backgroundPosition: [],
  hideSourceOnDrag: false,
  onBeginDrag: () => {},
  stopDrag: false,
};

Tile.propTypes = {
  id: PropTypes.number.isRequired,
  left: PropTypes.number,
  top: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
  backgroundPosition: PropTypes.array,
  hideSourceOnDrag: PropTypes.bool,
  isDragging: PropTypes.bool,
  connectDragPreview: PropTypes.func,
  connectDragSource: PropTypes.func,
  onBeginDrag: PropTypes.func,
  stopDrag: PropTypes.bool,
};

export default DragSource(ITEM_TYPES.tile, tileSource, collect)(Tile);
