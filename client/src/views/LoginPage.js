import React, {useState} from 'react';
import {
  Box,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Divider
} from '@chakra-ui/core';

import {FaFacebook, FaGoogle} from 'react-icons/fa';

const backgroundStyle = {
  backgroundImage: 'url(login-bg.svg)',
  backgroundColor: '#17002F',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
  height: 'calc(100vh - 113px)',
};

function LoginPage(props) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div style={backgroundStyle}>
      <Box pt="4%">
        <Box
          width={{base: '95%', sm: '480px'}}
          backgroundColor="white"
          m="auto"
          p="2.5em"
          borderRadius="8px"
          boxShadow="0px 4px 25px rgba(0, 0, 0, 0.13)"
        >
          <Heading as="h1" size="xl" textAlign="center">
            Login
          </Heading>
          <FormControl id="email" mt={4}>
            <FormLabel>Email</FormLabel>
            <Input focusBorderColor="purple.500" type="email" placeholder="Enter email address" />
          </FormControl>
          <FormControl id="password" mt={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                focusBorderColor="purple.500"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Text mt={2} textAlign="right" color="gray.500">
            Forgot password?
          </Text>
          <Button
            size="lg"
            mt={8}
            colorScheme="purple"
            isLoading={props.isSubmitting} //TODO: use Formik
            type="submit"
            width="100%"
          >
            Login
          </Button>
          <Text mt={4} textAlign="center" fontSize="xl" fontWeight="600">
            OR
          </Text>
          {/* TODO: Add Facebook and Google integration */}
          <Button mt={4} leftIcon={<FaFacebook />} colorScheme="facebook" width="100%">
            Login with Facebook
          </Button>
          <a href="/auth/google">
            <Button
              mt={4}
              leftIcon={<FaGoogle />}
              backgroundColor="#4285F4"
              _hover={{bg: '#296bd9'}}
              color="white"
              width="100%"
            >
              Login with Google
            </Button>
          </a>
          <Divider mt={8} />
          <Text mt={8} textAlign="center" fontSize="xl">
            New to site name? <u>Sign up</u>
          </Text>
        </Box>
      </Box>
    </div>
  );
}

export default LoginPage;
