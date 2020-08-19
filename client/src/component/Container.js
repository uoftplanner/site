import React from 'react';
import {Box} from '@chakra-ui/core';

// Use this component as a parent container for your content
function Container({children}) {
  return (
    <Box
      p={{
        base: '0 1em 0 1em',
        sm: '0 1.25em 0 1.25em',
        md: '0 2em 0 2em',
        lg: '0 61px 0 61px',
      }}
      margin="auto"
    >
      {children}
    </Box>
  );
}

export default Container;
