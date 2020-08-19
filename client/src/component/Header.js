import React from 'react';
import {Button, Flex, Heading} from '@chakra-ui/core';
import MenuItem from './MenuItem';

class Header extends React.Component {
  render() {
    let headerStyle = {
      padding: '34px 61px',
    };

    return (
      <Flex justifyContent="space-between" alignItems="center" wrap="wrap" style={headerStyle}>
        <Heading as="h1" size="xl">
          site name
        </Heading>

        <Flex display={{"base": "none", "md": "flex"}}
          alignItems="center"
          flexGrow="1"
          marginLeft="94px">
          <MenuItem>courses</MenuItem>
          <MenuItem lastItem={true}>about</MenuItem>
        </Flex>

        <Flex alignItems="center">
          <Button marginRight={{"base": "0px", "md": "38px"}} variant="outline">
            login
          </Button>
          <Button display={{"base": "none", "md": "flex"}}>sign up</Button>
        </Flex>
      </Flex>
    );
  }
}

export default Header;
