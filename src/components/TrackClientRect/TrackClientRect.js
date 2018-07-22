import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import actions from '../../store/ui/actions';

// TODO Do some tests
export class TrackClientRect extends Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    const clientRect = this.getRefBoundingClientRect();
    this.props.rectSet({ name: this.props.name, clientRect });
  }

  getRefBoundingClientRect() {
    return findDOMNode(this.ref.current).getBoundingClientRect();
  }

  render() {
    const { as: Component, children, rectSet, name, ...rest } = this.props;
    return (
      <Component {...rest} ref={this.ref}>
        {children}
      </Component>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = { rectSet: actions.rect.set };

TrackClientRect.defaultProps = {
  as: 'div',
  rectSet: () => {},
};

TrackClientRect.propTypes = {
  name: PropTypes.string.isRequired,
  as: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  rectSet: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackClientRect);
