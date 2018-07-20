import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../../lib/imageConstants';
import actions from '../../store/tiles/actions';
import { getDenormalizedTiles } from '../../store/tiles/selectors';
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
    const { onFillEnd, isFinished, ...restProps } = this.props;
    return (
      <Board
        onFill={this.handleFill}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        frozen={isFinished}
        {...restProps}
      />
    );
  }
}

const mapStateToProps = state => ({
  tilesRows: getDenormalizedTiles(state),
  isFinished: getIsFinished(state),
});

const mapDispatchToProps = {
  updateTile: actions.update.tile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer);
