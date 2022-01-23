import { Button, Box } from '@chakra-ui/react';
import React from 'react';
import { Formik, Form } from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [,register] = useRegisterMutation();
 
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={ async(values, {setErrors}) => {
          console.log("valor:",values);
          const result = await register(values);
          if(result.data?.register.errors){
              setErrors({
                username: "Hey i'm an error"
              })

          }
          
          console.log("Result", result);
         
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
              Register now!
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;