import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import '@fontsource/inter';
import '@fontsource/poppins';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.900',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'lg',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'blue.500' : 'blue.600',
          },
        }),
        outline: (props: any) => ({
          borderColor: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
          color: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.50',
          },
        }),
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
      },
    },
    Text: {
      baseStyle: (props: any) => ({
        color: props.colorMode === 'dark' ? 'gray.300' : 'gray.700',
      }),
    },
  },
});

export default theme;
