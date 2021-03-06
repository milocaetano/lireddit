import { Button, Box } from '@chakra-ui/react';
import React from 'react';
import { Formik, Form } from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log('valor:', values);
          const result = await register(values);

          if (result.data?.register.errors) {
            setErrors(toErrorMap(result.data?.register.errors));
          } else if (result.data?.register.user) {
            console.log('redirecting...');
            router.push('/');
          }

          console.log('Result', result);
        }}
      >
        {() => (
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
              Register now!
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
