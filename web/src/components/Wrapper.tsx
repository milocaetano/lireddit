import { Box } from '@chakra-ui/layout';
import React from 'react';

interface WrapperProps {}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box border="1px" borderColor='gray.200' p={5} mt={8} mx="auto" maxW="800px" w="100%">
      {children}
    </Box>
  );
};
