import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/core';
import SearchBar from '../component/SearchBar';

function HomePage() {
  const backgroundStyle = {
    backgroundImage: 'url(bg.svg)',
    height: 'calc(100vh - 113px)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <div style={backgroundStyle}>
      <Box maxWidth={['400px', '628px', '800px', '900px']} m="auto" pt="5%">
        <Heading
          maxWidth={['400px', '528px', '700px', '800px']}
          fontSize={['52px', '72px', '90px', '100px']}
          textAlign="center"
          m="auto"
        >
          Find the class that fits you
        </Heading>
        <Text fontSize="2xl" color="gray.600" textAlign="center" mt=".5em">
          lorem ipsum blah doloa
        </Text>
        <Box p={['0px', '0 10px 0 10px']}>
          <SearchBar />
        </Box>
      </Box>
    </div>
  );
}

export default HomePage;
