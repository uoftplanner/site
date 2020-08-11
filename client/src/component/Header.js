import React from 'react';
import Flex from '@chakra-ui/core/dist/Flex';
import Heading from '@chakra-ui/core/dist/Heading';
import MenuItem from './MenuItem';
import {Button} from '@chakra-ui/core';

class Header extends React.Component {

    render() {
        let headerStyle = {
            padding: '34px 61px'
        };

        return (
            <Flex justifyContent="space-between"
                  alignItems="center"
                  wrap="wrap"
                  style={headerStyle}>
                <Heading as="h1" size="xl">site name</Heading>

                <Flex alignItems="center" flexGrow="1" marginLeft="94px">
                    <MenuItem>courses</MenuItem>
                    <MenuItem lastItem={true}>about</MenuItem>
                </Flex>

                <Flex alignItems="center">
                    <Button marginRight="38px" variant="outline">
                        login
                    </Button>
                    <Button>
                        sign up
                    </Button>
                </Flex>
            </Flex>
        );
    }
}

export default Header;