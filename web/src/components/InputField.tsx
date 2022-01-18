import { Input } from '@chakra-ui/input';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { FieldHookConfig, useField } from 'formik';
import React from 'react';

type InputFieldProps = FieldHookConfig<any> & {
   label: string;
   placeholder: string;
   name: string;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, {error}] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Input  {...field} id={field.name}  placeholder={props.placeholder}/>
      { error? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};