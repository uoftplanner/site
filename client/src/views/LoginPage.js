import React, {useState} from 'react';
import {
  Box,
  Text,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Divider
} from '@chakra-ui/core';
import {Formik, Field} from 'formik';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';
import Axios from 'axios';
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
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .required('Password is required'),
      })}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };
          Axios.post('/auth/login', dataToSubmit)
            .then((response) => {
              //TODO: auto login user after registering or redirect
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => (
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
              <form onSubmit={props.handleSubmit}>
                <Field name="email">
                  {({field, form}) => (
                    <FormControl isInvalid={form.errors.email && form.touched.email} id="email" mt={2}>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input {...field} focusBorderColor="purple.500" type="email" placeholder="Enter email address" />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({field, form}) => (
                    <FormControl isInvalid={form.errors.password && form.touched.password} id="password" mt={2}>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
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
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
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
              </form>
              <Text mt={2} textAlign="center" fontSize="xl" fontWeight="600">
                OR
          </Text>
              <a href="/auth/facebook">
                <Button mt={2} leftIcon={<FaFacebook />} colorScheme="facebook" width="100%">
                  Login with Facebook
          </Button>
              </a>
              <a href="/auth/google">
                <Button
                  mt={2}
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
                New to site name? <Link to="/register"><u>Sign up</u></Link>
              </Text>
            </Box>
          </Box>
        </div>
      )}
    </Formik>
  );
}

export default LoginPage;
