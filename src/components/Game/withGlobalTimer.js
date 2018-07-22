import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../store/game/actions';

const withGlobalTimer = WrappedComponent => {
  class GlobalTimer extends Component {
    globalTimerFinish = () => {
      this.stopTimer();
      this.handleTick();
    };

    startTimer = () => {
      this.timer = setInterval(this.handleTick, 1000);
    };

    stopTimer = () => {
      clearInterval(this.timer);
    };

    handleTick = () => {
      this.props.elapsedUpdate({ elapsed: this.props.localElapsed });
    };

    render() {
      const { elapsedUpdate, ...restProps } = this.props;
      return (
        <WrappedComponent
          globalTimerStart={this.startTimer}
          globalTimerStop={this.stopTimer}
          globalTimerFinish={this.globalTimerFinish}
          {...restProps}
        />
      );
    }
  }
  const mapPropsToState = () => ({});
  const mapDispatchToProps = {
    elapsedUpdate: actions.elapsed.update,
  };

  return connect(
    mapPropsToState,
    mapDispatchToProps,
  )(GlobalTimer);
};

export default withGlobalTimer;
