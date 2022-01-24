import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import React from 'react';
import theme from '../../theme';

import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:4000/graphql',
});

function MyApp({ Component, pageProps }:any) {
  return (
    <Provider value={client}>
      <ChakraProvider>
        <ColorModeProvider options={{ initialColorMode: theme.config.initialColorMode }}>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}
export default MyApp;
