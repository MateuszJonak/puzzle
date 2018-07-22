import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getTiles } from '../../store/tiles/selectors';
import { getTilesBoxRect } from '../../store/ui/selectors';
import { getIsRunning, getIsFinished } from '../../store/game/selectors';
import actions from '../../store/tiles/actions';
import TilesBox from './TilesBox';

class TilesBoxContainer extends Component {
  handleBeginDrag = () => {
    if (!this.props.isRunning && !this.props.isFinished) {
      this.props.onBeginFirstDrag();
    }
  };

  handleDrop = (id, sourceClientOffset) => {
    const { tilesBoxRect, updateTile } = this.props;
    if (!tilesBoxRect) {
      return;
    }
    const positions = {
      left: sourceClientOffset.x - tilesBoxRect.left,
      top: sourceClientOffset.y - tilesBoxRect.top,
    };
    updateTile(id, { ...positions, isMatched: false });
  };

  render() {
    return (
      <TilesBox
        tiles={this.props.tiles}
        onDrop={this.handleDrop}
        handleBeginDrag={this.handleBeginDrag}
      />
    );
  }
}

const mapStateToProps = state => ({
  isRunning: getIsRunning(state),
  isFinished: getIsFinished(state),
  tiles: getTiles(state),
  tilesBoxRect: getTilesBoxRect(state),
});

const mapDispatchToProps = {
  updateTile: actions.update.tile,
  positionsCalcalute: actions.positions.calculate,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(TilesBoxContainer);
