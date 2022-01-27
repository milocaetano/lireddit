import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation, useRegisterMutation, UsernamePasswordInput } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

interface loginProps {

}
const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' } as UsernamePasswordInput}
        onSubmit={async (values, { setErrors }) => {
          console.log('valor:', values);
          const result = await login({options: values});

          if (result.data?.login.errors) {
            setErrors(toErrorMap(result.data?.login.errors));
          } else if (result.data?.login.user) {
            console.log('redirecting...');
            router.push('/');
          }

          console.log('Result', result);
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Login;