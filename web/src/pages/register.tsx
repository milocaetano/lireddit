import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import React from 'react';
import { Formik, Form } from 'formik';
import {Wrapper} from '../components/wrapper';
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
            <FormControl>
              <FormLabel htmlFor="useraname">Username</FormLabel>
              <Input id="useraname" placeholder="useraname" value={values.username} />
              {/*<FormErrorMessage>{form.errors.useraname}</FormErrorMessage>*/}
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
