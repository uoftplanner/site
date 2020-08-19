import React from 'react';
import {Box, Text} from '@chakra-ui/core';
import Container from './Container';

function CourseDescription(props) {
  return (
    <Box m="1.5em 0 1.5em 0" background="white">
      <Container>
        <Text fontSize="sm" fontWeight="700" color="gray.400" mb="0.25em">
          DESCRIPTION
        </Text>
        <Text fontSize="lg" width={{base: '100%', lg: '60%'}}>
          {props.description}
        </Text>
      </Container>
    </Box>
  );
}

export default CourseDescription;
