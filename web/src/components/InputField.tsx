import { Input } from '@chakra-ui/input';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { FieldHookConfig, useField } from 'formik';
import React from 'react';

type InputFieldProps = FieldHookConfig<any> & {
   label: string;
   placeholder: string;
   name: string;
   type?: string;
};

export const InputField: React.FC<InputFieldProps> = ({type, label, ...props}) => {
  const [field, {error}] = useField(props);
  //console.log(field);
  console.log('teste', type);
 
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input type={type} {...field} />
      { error? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};