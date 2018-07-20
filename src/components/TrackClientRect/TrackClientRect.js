import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import actions from '../../store/ui/actions';

class TrackClientRect extends Component {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackClientRect);
