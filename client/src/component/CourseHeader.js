import React from 'react';
import {Box, Text} from '@chakra-ui/core';
import Container from './Container';

function CourseHeader(props) {
    return (
        <Box background="purple.800" p="1em 0 1.6em 0">
            <Container>
                <Text fontSize="4xl" fontWeight="600" color="white" mb="0.25em">{props.name}</Text>
                <Text fontSize="2xl" fontWeight="400" color="white">{props.code}</Text>
                <Text fontSize="2xl" fontWeight="400" color="white">{props.campus}, {props.term}</Text>
            </Container>
        </Box>
    );
}

export default CourseHeader;
