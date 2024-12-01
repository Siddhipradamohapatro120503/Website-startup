import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <ChakraProvider>
      <CSSReset />
      <LandingPage />
    </ChakraProvider>
  );
};

export default App;
