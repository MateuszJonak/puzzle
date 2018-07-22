import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Game from './Game';
const mockDuration = 600;
// const mockGameController = ({ children }) =>
// children({ duration: mockDuration });
jest.mock('./GameController', () => ({ children }) =>
  children({ duration: mockDuration }),
);

describe('Game', () => {
  let tree;
  const shallowEnzyme = (props = {}) => shallow(<Game {...props} />);

  beforeEach(() => {
    tree = shallowEnzyme();
  });

  it('should have instance of GameController', () => {
    const instance = tree.instance();

    expect(instance).toBeInstanceOf(Game);
  });

  it('should render component correctly with props', () => {
    expect(toJson(tree.dive())).toMatchSnapshot();
  });
});
