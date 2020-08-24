import React from 'react';
import {Box, Text} from '@chakra-ui/core';
import Container from './Container';

function CourseInfoCard(props) {
  return (
    <div>
      {/* INFO CARD (DESKTOP) */}
      <Box
        display={{base: 'none', lg: 'initial'}}
        width="35%"
        zIndex="2"
        position="absolute"
        right={props.right}
        top={props.top}
        p="10px"
        background="white"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="5px"
        boxShadow="md"
      >
        <Text fontSize="sm" fontWeight="700" color="gray.400">
          PREREQUISITES
        </Text>
        <Text mb="0.5em">{props.prerequisites || 'N/A'}</Text>

        <Text fontSize="sm" fontWeight="700" color="gray.400">
          COREQUISITES
        </Text>
        <Text mb="0.5em">{props.corequisites || 'N/A'}</Text>

        <Text fontSize="sm" fontWeight="700" color="gray.400">
          EXCLUSIONS
        </Text>
        <Text mb="0.5em">{props.exclusions || 'N/A'}</Text>
      </Box>

      {/* INFO SECTION (MOBILE) */}
      <Box display={{base: 'initial', lg: 'none'}}>
        <Container>
          <Text fontSize="sm" fontWeight="700" color="gray.400" mt="1.5em">
            PREREQUISITES
          </Text>
          <Text mb="0.5em">{props.prerequisites}</Text>

          <Text fontSize="sm" fontWeight="700" color="gray.400">
            COREQUISITES
          </Text>
          <Text mb="0.5em">{props.corequisites || 'N/A'}</Text>

          <Text fontSize="sm" fontWeight="700" color="gray.400">
            EXCLUSIONS
          </Text>
          <Text mb="0.5em">{props.exclusions || 'N/A'}</Text>
        </Container>
      </Box>
    </div>
  );
}

export default CourseInfoCard;
