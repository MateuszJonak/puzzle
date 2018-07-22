import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { TrackClientRect } from './TrackClientRect';

const mockGetBoundingClientRect = jest.fn();
jest.mock('react-dom', () => ({
  findDOMNode: jest.fn().mockImplementation(() => ({
    getBoundingClientRect: mockGetBoundingClientRect,
  })),
}));

describe('TrackClientRect', () => {
  let props, tree, rectSetMock;
  const shallowEnzyme = props => shallow(<TrackClientRect {...props} />);
  const mountEnzyme = props => mount(<TrackClientRect {...props} />);

  beforeEach(() => {
    rectSetMock = jest.fn();
    props = {
      name: 'rect1',
      as: 'div',
      rectSet: rectSetMock,
    };
    tree = shallowEnzyme(props);
  });

  it('should have instance of GameController', () => {
    const instance = tree.instance();

    expect(instance).toBeInstanceOf(TrackClientRect);
  });

  it('should render component correctly with props', () => {
    tree.setProps({
      children: <h1>title</h1>,
    });
    expect(toJson(tree)).toMatchSnapshot();
  });

  describe('Instance tests', () => {
    let instance;

    beforeEach(() => {
      instance = tree.instance();
    });

    describe('getRefBoundingClientRect', () => {
      const resultGetBoundingClientRect = 'boundingClientRect';
      beforeEach(() => {
        instance.ref = {
          current: 'current',
        };
        mockGetBoundingClientRect.mockReturnValue(resultGetBoundingClientRect);
      });

      it('should return bounding client rect', () => {
        expect(instance.getRefBoundingClientRect()).toBe(
          resultGetBoundingClientRect,
        );
      });
    });
  });

  describe('Component did mount', () => {
    let getRefBoundingClientRectSpyOn;
    const resultGetBoundingClientRect = 'boundingClientRect';

    beforeEach(() => {
      getRefBoundingClientRectSpyOn = jest.spyOn(
        TrackClientRect.prototype,
        'getRefBoundingClientRect',
      );
      getRefBoundingClientRectSpyOn.mockReturnValue(
        resultGetBoundingClientRect,
      );
    });

    it('should have called rectSet when game is running', () => {
      tree = mountEnzyme(props);
      expect(getRefBoundingClientRectSpyOn).toHaveBeenCalled();
      expect(rectSetMock).toHaveBeenCalledWith({
        name: props.name,
        clientRect: resultGetBoundingClientRect,
      });
    });
    afterEach(() => {
      getRefBoundingClientRectSpyOn.mockClear();
    });
  });
});
