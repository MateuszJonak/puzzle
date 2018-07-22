import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ITEM_TYPES } from '../../lib/itemTypes';
import { Tile } from '../Tile';
import { TrackClientRect } from '../TrackClientRect';
import { TILES_BOX_RECT_NAME } from '../../store/ui/selectors';
import './TilesBox.css';

const tilesBoxTarget = {
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

class TilesBox extends Component {
  render() {
    const { connectDropTarget } = this.props;
    return (
      connectDropTarget &&
      connectDropTarget(
        <div className="tiles-box-drop-target">
          <TrackClientRect
            as="div"
            name={TILES_BOX_RECT_NAME}
            className="tiles-box">
            {this.renderTiles()}
          </TrackClientRect>
        </div>,
      )
    );
  }

  renderTiles() {
    const { handleBeginDrag, tiles } = this.props;
    return tiles.map(
      tile =>
        !tile.isMatched && (
          <Tile
            key={tile.id}
            {...tile}
            hideSourceOnDrag
            onBeginDrag={handleBeginDrag}
          />
        ),
    );
  }
}

export default DropTarget(ITEM_TYPES.tile, tilesBoxTarget, collect)(TilesBox);
