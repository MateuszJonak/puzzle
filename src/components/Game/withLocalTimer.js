import React, { Component } from 'react';

const withLocalTimer = WrappedComponent => {
  class LocalTimer extends Component {
    constructor(props) {
      super(props);

      this.state = { startTime: null, localElapsed: 0, lastElapsed: 0 };
    }

    localTimerStart = ({ lastElapsed = 0 } = {}) => {
      this.setState({ lastElapsed, startTime: new Date() });
      this.startTimer();
    };

    localTimerFinish = () => {
      this.setState({ startDate: null, localElapsed: 0, lastElapsed: 0 });
      this.stopTimer();
    };

    startTimer = () => {
      this.timer = setInterval(this.handleTick, 50);
    };

    stopTimer = () => {
      clearInterval(this.timer);
    };

    handleTick = () => {
      const { lastElapsed, startTime } = this.state;
      this.setState({
        localElapsed: lastElapsed + (new Date() - startTime),
      });
    };

    render() {
      return (
        <WrappedComponent
          localTimerStart={this.localTimerStart}
          localTimerStop={this.stopTimer}
          localTimerFinish={this.localTimerFinish}
          {...this.state}
          {...this.props}
        />
      );
    }
  }

  return LocalTimer;
};

export default withLocalTimer;
