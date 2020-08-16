import React from 'react';
import {Box, Text} from '@chakra-ui/core';

function CourseInfoCard(props) {
    return (
        <Box
            zIndex="2"
            position="absolute"
            right={props.right}
            top={props.top}
            p="10px"
            background="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="5px"
            boxShadow="md">
            <Text fontSize="sm" fontWeight="700" color="gray.400">PREREQUISITES</Text>
            <Text mb="0.5em">{props.prerequisites}</Text>

            <Text fontSize="sm" fontWeight="700" color="gray.400">COREQUISITES</Text>
            <Text mb="0.5em">{props.corequisites || "N/A"}</Text>

            <Text fontSize="sm" fontWeight="700" color="gray.400">EXCLUSIONS</Text>
            <Text mb="0.5em">{props.exclusions || "N/A"}</Text>
        </Box>
    );
}

export default CourseInfoCard;
