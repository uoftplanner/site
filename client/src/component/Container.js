import React from 'react';
import Box from '@chakra-ui/core';
import PropTypes from 'prop-types';

// Use this component as a parent container for your content
function Container({children}) {
  return (
    <Box maxWidth={['400px', '628px', '800px', '1166px']} margin="auto">
      {children}
    </Box>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
