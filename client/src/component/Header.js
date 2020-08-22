import React from 'react';
import {Button, Flex, Heading} from '@chakra-ui/core';
import {Link} from 'react-router-dom';
import MenuItem from './MenuItem';

const headerStyle = {
  padding: '34px 61px',
};

function Header() {
  return (
    <Flex justifyContent="space-between" alignItems="center" wrap="wrap" style={headerStyle}>
      <Link to="/">
        <Heading as="h1" size="xl">
          site name
        </Heading>
      </Link>

      <Flex display={{base: 'none', md: 'flex'}} alignItems="center" flexGrow="1" marginLeft="94px">
        <MenuItem>courses</MenuItem>
        <MenuItem lastItem>about</MenuItem>
      </Flex>

      <Flex alignItems="center">
        <Link to="/login">
          <Button marginRight={{base: '0px', md: '38px'}} variant="outline">
            login
          </Button>
        </Link>
        <Button display={{base: 'none', md: 'flex'}}>sign up</Button>
      </Flex>
    </Flex>
  );
}

export default Header;
