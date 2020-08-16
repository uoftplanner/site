import React from 'react';
import {Box} from '@chakra-ui/core';

// Use this component as a parent container for your content
function Container({children}) {
    return (
        <Box p="0 61px 0 61px" margin="auto">
            {children}
        </Box>
    );
}

export default Container;
