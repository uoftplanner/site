import React from 'react';
import {
  Box,
  Avatar,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem as ChakraMenuItem,
} from '@chakra-ui/core';
import {Link} from 'react-router-dom';
import {FaCaretDown} from 'react-icons/fa';
import UserContext from '../context/UserContext';
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

      <UserContext.Consumer>
        {value => {
          console.log(value);
          if (value.isLoading) {
            return (<div></div>);
          } else if (value.loggedIn) {
            return (
              <Menu>
                <MenuButton>
                  <Flex alignItems="center">
                    <Avatar name={value.user.name} src={value.user.picture} />
                    <Box as={FaCaretDown} />
                  </Flex>
                </MenuButton>
                <MenuList>
                  <ChakraMenuItem>Profile</ChakraMenuItem>
                  <ChakraMenuItem as="a" href="/auth/logout">
                    Logout
                  </ChakraMenuItem>
                </MenuList>
              </Menu>
            );
          }
          return (
            <Flex alignItems="center">
              <Box marginRight={{base: '0px', md: '38px'}}>
                <Link to="/login">
                  <Button variant="outline">
                    login
                  </Button>
                </Link>
              </Box>
              <Link to="/register">
                <Button display={{base: 'none', md: 'flex'}}>sign up</Button>
              </Link>
            </Flex>
          );
        }}
      </UserContext.Consumer>
    </Flex>
  );
}

export default Header;
