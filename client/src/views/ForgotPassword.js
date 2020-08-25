import React from 'react';
import {
  Box,
  Text,
  Image,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  useToast
} from '@chakra-ui/core';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

const backgroundStyle = {
  backgroundImage: 'url(../login-bg.svg)',
  backgroundColor: '#17002F',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
  height: '100vh'
};

function ForgotPassword() {
  const toast = useToast();

  return (
    <Formik
      initialValues={{email: ''}}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required')
      })}
      onSubmit={(values, {setSubmitting, setStatus}) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email
          };
          Axios.post('/password/forgot', dataToSubmit)
            .then((response) => {
              // If password reset link generation was successful
              if (response.data.success) {
                // TODO: remove console log
                console.log(response.data);
                setStatus("submitted");
              } else {
                // Password reset link generation failed
                toast({
                  title: "Failed to generate password reset link.",
                  description: "Server error.",
                  position: "top",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }
            })
            .catch((err) => {
              // Password reset link generation failed
              // Return the error message from server
              if (err.response.data) {
                toast({
                  title: "Failed to generate password reset link.",
                  description: err.response.data.err || "Server error.",
                  position: "top",
                  status: "error",
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
                Forgot Password
              </Heading>

              {props.status === "submitted" ?
                <div>
                  <Image m="auto auto 2em auto" width="150px" src="../undraw_Mail_sent_re_0ofv.svg" />
                  <Text mb="1em">
                    Please check your email for a link to reset your password.
                  </Text>
                </div>
                :
                <div>
                  <Text mb="1em">
                    Enter your email address here and check your email for a link to reset your password.
                </Text>
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
              }
            </Box>
          </Box>
        </div>
      )}
    </Formik>
  );
}

export default ForgotPassword;
