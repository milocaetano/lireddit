import { ChakraProvider, ColorModeProvider, ThemeConfig } from '@chakra-ui/react'

//import theme from '../theme'

import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const config : ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}


const theme = extendTheme({ config })

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
