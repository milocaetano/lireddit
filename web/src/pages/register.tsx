import {Button, Box } from '@chakra-ui/react';
import React from 'react';
import { Formik, Form } from 'formik';
import { Wrapper } from '../components/wrapper';
import { InputField } from '../components/InputField';
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <InputField name="username" placeholder="Username" label="Username"></InputField>     
            <Box mt="4">       
            <InputField name="password" placeholder="Password" label="Password" type="password"></InputField>
            </Box>
            <Button mt={4} colorScheme="teal" type="submit">Register</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
