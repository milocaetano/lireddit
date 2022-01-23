import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import React from 'react';
import theme from '../../theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ColorModeProvider options={{ initialColorMode: theme.config.initialColorMode }}>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}
export default MyApp;
