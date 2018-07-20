import React, { Component } from 'react';
import BoardField from './BoardField';
import { Tile } from '../Tile';
import './Board.css';

class Board extends Component {
  render() {
    const { width, height } = this.props;
    return (
      <div className="board" style={{ width, height }}>
        {this.renderTilesRows()}
      </div>
    );
  }

  renderTilesRows() {
    const { tilesRows } = this.props;

    return tilesRows.map((tilesRow, index) => (
      <div key={index} className="board-row">
        {this.renderTiles(tilesRow)}
      </div>
    ));
  }

  renderTiles(tilesRow) {
    const { updateTile, onFill, frozen } = this.props;
    return tilesRow.map(tile => (
      <BoardField
        key={tile.id}
        id={tile.id}
        updateTile={updateTile}
        onFill={onFill}
        width={tile.width}
        height={tile.height}>
        {tile.isMatched && (
          <Tile
            {...tile}
            hideSourceOnDrag
            stopDrag={frozen}
            style={{ position: 'static' }}
          />
        )}
      </BoardField>
    ));
  }
}

export default Board;
