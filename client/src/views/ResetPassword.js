import React, {useEffect, useState} from 'react';
import {
  Box,
  Text,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Spinner,
  useToast,
} from '@chakra-ui/core';
import {Formik, Field} from 'formik';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';
import Axios from 'axios';

const backgroundStyle = {
  backgroundImage: 'url(../../../login-bg.svg)',
  backgroundColor: '#17002F',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
};

function ResetPassword(props) {
  const toast = useToast();
  const {ident, today, hash} = props.match.params;
  const [IsLoading, setIsLoading] = useState(true);
  const [ValidLink, setValidLink] = useState(false);

  useEffect(() => {
    Axios.get(`/password/check/${ident}/${today}-${hash}`)
      .then(response => {
        if (response.data.success) {
          setValidLink(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [props.match.params]);

  if (IsLoading) {
    return <Spinner size="xl" color="purple.500" m="10% auto" d="flex" alignItems="center" />;
  }
  if (ValidLink) {
    return (
      <Formik
        initialValues={{password: '', confirmPassword: ''}}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Please enter a password'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please type your password again'),
        })}
        onSubmit={(values, {setSubmitting, setStatus}) => {
          setTimeout(() => {
            const dataToSubmit = {
              ident,
              today,
              hash,
              password: values.password,
            };
            Axios.post('/password/reset', dataToSubmit)
              .then(response => {
                // If password reset was successful
                if (response.data.success) {
                  setStatus('submitted');
                } else {
                  // Password reset failed
                  toast({
                    title: 'Password reset failed.',
                    description: 'Server error.',
                    position: 'top',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  });
                }
              })
              .catch(err => {
                // Password reset failed
                // Return the error message from server
                if (err.response.data) {
                  toast({
                    title: 'Password reset failed.',
                    description: err.response.data.err || 'Server error.',
                    position: 'top',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  });
                }
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
                <Heading as="h1" size="xl" textAlign="center" mb="1em">
                  Reset Password
                </Heading>

                {props.status === 'submitted' ? (
                  <div>
                    <Text mb="1em">
                      😀 Password successfully reset! Please{' '}
                      <Link to="/login">login with your new password</Link>.
                    </Text>
                  </div>
                ) : (
                  <div>
                    <Text mb="1em">Set a new password. Minimum 6 characters.</Text>
                    <form onSubmit={props.handleSubmit}>
                      <Field name="password">
                        {({field, form}) => (
                          <FormControl
                            isInvalid={form.errors.password && form.touched.password}
                            id="password"
                            mt={2}
                          >
                            <FormLabel htmlFor="password">New Password</FormLabel>
                            <Input
                              {...field}
                              focusBorderColor="purple.500"
                              type="password"
                              placeholder="New password"
                            />
                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="confirmPassword">
                        {({field, form}) => (
                          <FormControl
                            isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}
                            id="confirmPassword"
                            mt={2}
                          >
                            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                            <Input
                              {...field}
                              focusBorderColor="purple.500"
                              type="password"
                              placeholder="Confirm new password"
                            />
                            <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Button
                        size="lg"
                        mt={8}
                        colorScheme="purple"
                        isLoading={props.isSubmitting}
                        type="submit"
                        width="100%"
                      >
                        Reset Password
                      </Button>
                    </form>
                  </div>
                )}
              </Box>
            </Box>
          </div>
        )}
      </Formik>
    );
  }
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
          ⚠️ Invalid or expired link.
        </Box>
      </Box>
    </div>
  );
}

export default ResetPassword;
