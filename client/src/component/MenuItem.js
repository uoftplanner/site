import React from 'react';
import {Heading} from '@chakra-ui/core';
import PropTypes from 'prop-types';

class MenuItem extends React.PureComponent {
  render() {
    const {children, lastItem} = this.props;

    return (
      <Heading size="sm" marginRight={lastItem ? '0px' : '65px'}>
        {children}
      </Heading>
    );
  }
}

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  lastItem: PropTypes.bool,
};

MenuItem.defaultProps = {
  lastItem: false,
};

export default MenuItem;
