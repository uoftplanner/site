import React from "react"
import { Box, Button, Text, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Icon } from "@chakra-ui/core"
import Container from '../component/Container'

function Homepage() {
    const backgroundStyle = {
        backgroundImage: 'url(bg.svg)',
        height: 'calc(100vh - 113px)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
    return (
        <div style={backgroundStyle}>
            <Box maxWidth={["400px", "628px", "800px", "900px"]} m="auto" pt="5%">
                <Heading maxWidth={["400px", "528px", "700px", "800px"]}
                    fontSize={["52px", "72px", "90px", "100px"]}
                    textAlign="center"
                    m="auto">
                    Find the class that fits you
                </Heading>
                <Text fontSize="2xl" color="gray.600" textAlign="center" mt=".5em">
                    lorem ipsum blah doloa
                    </Text>
                <InputGroup size="lg" mt="2em">
                    <InputLeftElement children={<Icon name="search" color="gray.300" />} />
                    <Input placeholder="Search for a course..."
                        borderWidth="2px"
                        focusBorderColor="purple.500"
                        aria-label="Search bar"
                        aria-describedby="Search for a class here" />
                    <InputRightElement width="7rem">
                        <Button variantColor="purple" size="lg">
                            SEARCH
                            </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
        </div>
    )
}

export default Homepage
