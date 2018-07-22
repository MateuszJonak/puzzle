import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
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

export class GameController extends Component {
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
    const { localTimerStart, globalTimerStart } = this.props;
    localTimerStart({ lastElapsed });
    globalTimerStart();
  }

  timersStop() {
    const { localTimerStop, globalTimerStop } = this.props;
    localTimerStop();
    globalTimerStop();
  }

  timersReset() {
    const { localTimerFinish, globalTimerStop } = this.props;
    localTimerFinish();
    globalTimerStop();
  }

  timersFinish() {
    const { globalTimerFinish, localTimerFinish } = this.props;
    globalTimerFinish();
    localTimerFinish();
  }

  render() {
    const { localElapsed, isFinished, elapsed, children } = this.props;

    const duration = isFinished
      ? moment.duration(elapsed).format('mm:ss:SS')
      : moment.duration(localElapsed).format('mm:ss:SS');

    return (
      <React.Fragment>
        {children({
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

const propsFunctions = [
  'actionGameStart',
  'actionGameFinish',
  'actionGameReset',
  'localTimerStart',
  'localTimerStop',
  'localTimerFinish',
  'globalTimerStart',
  'globalTimerStop',
  'globalTimerFinish',
];

const propsFunctionsPropTypes = propsFunctions.reduce(
  (result, propType) => ({ ...result, [propType]: PropTypes.func }),
  {},
);

const propsFunctionsDefaultProps = propsFunctions.reduce(
  (result, propType) => ({ ...result, [propType]: () => {} }),
  {},
);

GameController.propTypes = {
  isRunning: PropTypes.bool,
  isFinished: PropTypes.bool,
  elapsed: PropTypes.number,
  localElapsed: PropTypes.number,
  children: PropTypes.func,
  ...propsFunctionsPropTypes,
};

GameController.defaultProps = {
  isRunning: false,
  isFinished: false,
  elapsed: 0,
  localElapsed: 0,
  children: () => {},
  ...propsFunctionsDefaultProps,
};

export default compose(
  withLocalTimer,
  withGlobalTimer,
  connect(
    mapPropsToState,
    mapDispatchToProps,
  ),
)(GameController);
