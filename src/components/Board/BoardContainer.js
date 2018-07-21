import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import actions from '../../store/tiles/actions';
import {
  getDenormalizedTiles,
  getBoardDimension,
} from '../../store/tiles/selectors';
import { getIsFinished } from '../../store/game/selectors';

class BoardContainer extends Component {
  handleFill = () => {
    const { tilesRows, onFillEnd } = this.props;
    const isFillEnd = tilesRows.every(tileRow =>
      tileRow.every(tile => tile.isMatched),
    );
    if (isFillEnd) {
      onFillEnd();
    }
  };

  render() {
    const { onFillEnd, isFinished, boardDimension, ...restProps } = this.props;
    return (
      <Board
        onFill={this.handleFill}
        width={boardDimension.width}
        height={boardDimension.height}
        frozen={isFinished}
        {...restProps}
      />
    );
  }
}

const mapStateToProps = state => ({
  tilesRows: getDenormalizedTiles(state),
  boardDimension: getBoardDimension(state),
  isFinished: getIsFinished(state),
});

const mapDispatchToProps = {
  updateTile: actions.update.tile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer);
