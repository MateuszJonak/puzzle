import React from 'react';
import { shallow, mount } from 'enzyme';
import { GameController } from './GameController';

describe('GameController', () => {
  let props, tree;
  const shallowEnzyme = props => shallow(<GameController {...props} />);
  const mountEnzyme = props => mount(<GameController {...props} />);

  beforeEach(() => {
    props = {
      elapsed: 345,
      localElapsed: 350,
    };
    tree = shallowEnzyme(props);
  });

  it('should have instance of GameController', () => {
    const instance = tree.instance();

    expect(instance).toBeInstanceOf(GameController);
  });

  describe('Instance tests', () => {
    let instance;

    beforeEach(() => {
      instance = tree.instance();
    });

    describe('gameStart', () => {
      let actionGameStartMock;
      beforeEach(() => {
        actionGameStartMock = jest.fn();
        tree.setProps({
          actionGameStart: actionGameStartMock,
        });
        instance.timersStart = jest.fn();
      });
      it('should game start if isFinished and isRunning is false', () => {
        tree.setProps({
          isFinished: false,
          isRunning: false,
        });

        instance.gameStart();
        expect(actionGameStartMock).toHaveBeenCalled();
      });
      it('should not game start if isFinished or isRunning is true', () => {
        tree.setProps({
          isFinished: true,
          isRunning: false,
        });

        instance.gameStart();
        expect(actionGameStartMock).not.toHaveBeenCalled();

        tree.setProps({
          isFinished: false,
          isRunning: true,
        });

        instance.gameStart();
        expect(actionGameStartMock).not.toHaveBeenCalled();
      });
    });
  });

  describe('Component did mount', () => {
    let timersStartSpyOn;

    beforeEach(() => {
      timersStartSpyOn = jest.spyOn(GameController.prototype, 'timersStart');
    });

    it('should have called timersStart when game is running', () => {
      tree = mountEnzyme({ ...props, isRunning: true });
      expect(timersStartSpyOn).toHaveBeenCalled();
    });
    afterEach(() => {
      timersStartSpyOn.mockClear();
    });
  });

  describe('Component will unmount', () => {
    let timersStopSpyOn;

    beforeEach(() => {
      timersStopSpyOn = jest.spyOn(GameController.prototype, 'timersStop');
    });

    it('should have called timersStop when component will unmount', () => {
      tree = mountEnzyme({ ...props, isRunning: true });
      tree.unmount();
      expect(timersStopSpyOn).toHaveBeenCalled();
    });
    afterEach(() => {
      timersStopSpyOn.mockClear();
    });
  });
});
