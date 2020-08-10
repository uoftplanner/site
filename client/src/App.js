import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import React from 'react';
import './App.css';

function App() {
  return (
      <ThemeProvider>
        <CSSReset />
        <h1>Some text</h1>
      </ThemeProvider>
  );
}

export default App;
