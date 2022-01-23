import { Button, Box } from '@chakra-ui/react';
import React from 'react';
import { Formik, Form } from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
interface registerProps {}

const REGISTER_MUT = `
mutation ($username: String!, $password: String!) {
  register(username: $username, password: $password){
    errors{
      field,
      message
    }
    user{
      id,
      username
    }
}
`;

const Register: React.FC<registerProps> = ({}) => {
  const [,register] = useMutation(REGISTER_MUT);
 
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={values => {
          console.log(values);
          register(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <InputField name="username" placeholder="Username" label="Username"></InputField>
            <Box mt="4">
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              ></InputField>
            </Box>
            <Button mt={4} colorScheme="teal" type="submit">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
