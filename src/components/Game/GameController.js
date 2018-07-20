import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import actions from '../../store/game/actions';
import {
  getIsRunning,
  getIsFinished,
  getElapsed,
} from '../../store/game/selectors';
import withLocalTimer from './withLocalTimer';
import withGlobalTimer from './withGlobalTimer';

momentDurationFormatSetup(moment);

class GameController extends Component {
  componentDidMount() {
    const { isRunning, elapsed } = this.props;
    if (isRunning) {
      this.timersStart({ lastElapsed: elapsed });
    }
  }

  componentWillUnmount() {
    this.timersStop();
  }

  gameStart = () => {
    const { actionGameStart, isRunning, isFinished } = this.props;
    if (!isFinished && !isRunning) {
      this.timersStart();
      actionGameStart();
    }
  };

  gameReset = () => {
    const { actionGameReset } = this.props;
    this.timersReset();
    actionGameReset();
  };

  gameFinish = () => {
    const { actionGameFinish } = this.props;
    this.timersFinish();
    actionGameFinish();
  };

  timersStart({ lastElapsed } = {}) {
    this.props.localTimerStart({ lastElapsed });
    this.props.globalTimerStart();
  }

  timersStop() {
    this.props.localTimerStop();
    this.props.globalTimerStop();
  }

  timersReset() {
    this.props.localTimerFinish();
    this.props.globalTimerStop();
  }

  timersFinish() {
    this.props.globalTimerFinish();
    this.props.localTimerFinish();
  }

  render() {
    const { localElapsed, isFinished, elapsed } = this.props;
    const duration = isFinished
      ? moment.duration(elapsed).format('mm:ss:SS')
      : moment.duration(localElapsed).format('mm:ss:SS');

    return (
      <React.Fragment>
        {this.props.children({
          gameStart: this.gameStart,
          gameFinish: this.gameFinish,
          gameReset: this.gameReset,
          duration,
        })}
      </React.Fragment>
    );
  }
}
const mapPropsToState = state => ({
  isRunning: getIsRunning(state),
  isFinished: getIsFinished(state),
  elapsed: getElapsed(state),
});
const mapDispatchToProps = {
  actionGameStart: actions.game.start,
  actionGameFinish: actions.game.finish,
  actionGameReset: actions.game.reset,
};

GameController.defaultProps = {
  elapsed: 0,
};

export default compose(
  withLocalTimer,
  withGlobalTimer,
  connect(
    mapPropsToState,
    mapDispatchToProps,
  ),
)(GameController);
