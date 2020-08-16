import React from 'react';
import Bloodhound from 'corejs-typeahead';
import {
    Button,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    List,
    ListIcon,
    ListItem,
    Text
} from '@chakra-ui/core';
import {FaSearch, FaBook} from 'react-icons/fa';

const MAX_SUGGESTIONS = 5;

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.bloodhound = new Bloodhound({
            local: ['some', 'default', 'suggestions'],
            queryTokenizer: Bloodhound.tokenizers.ngram,
            datumTokenizer: Bloodhound.tokenizers.nonword,
            remote: {
                wildcard: ':query',
                url: '/api/course/search/:query',
            }
        });

        this.suggestionMenu = React.createRef();

        this.state = {suggestions: [], focused: false};

        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(event) {
        this.bloodhound.search(event.target.value,
            // sync request
            results => {
                //this.setState({suggestions: results});
            },
            // async request
            results => {
                this.setState({suggestions: results});
            });
    }

    onFocus() {
        this.setState({focused: true});
    }

    onBlur() {
        setTimeout(() => {
            this.setState({focused: false});
        }, 200);
    }

    render() {
        let courseHeader;
        let courseResults;
        let showMoreResults;
        if (this.state.focused && this.state.suggestions.length > 0) {
            courseHeader = <Text fontSize="sm" fontWeight="700" color="gray.400" ml={3} pt={3}>COURSES</Text>;

            let partialSuggestions = this.state.suggestions.slice(0, MAX_SUGGESTIONS);
            courseResults = partialSuggestions.map((suggestion, index) => {
                return (
                    <ListItem display="flex" pt={3} pb={3} key={index} alignItems="center">
                        <ListIcon as={FaBook} color="purple.500" width="22px" height="22px" ml={3} />
                        <Text fontSize="lg" fontWeight="600" color="black">{suggestion}</Text>
                    </ListItem>
                )
            });

            if (this.state.suggestions.length - MAX_SUGGESTIONS > 0) {
                showMoreResults = <Text fontSize="md" fontWeight="500" color="gray.500" ml={3} pb={3}>
                    Show more ({this.state.suggestions.length - MAX_SUGGESTIONS} results)
            </Text>;
            }
        }

        return (
            <div>
                <InputGroup size="lg" mt="2em">
                    <InputLeftElement children={<Icon as={FaSearch} color="gray.300" />} />
                    <Input placeholder="Search for a course..."
                        borderRadius={this.state.focused && this.state.suggestions.length > 0 ? "5px 5px 0 0" : "5px"}
                        borderWidth="2px"
                        focusBorderColor="purple.500"
                        aria-label="Search bar"
                        aria-describedby="Search for a class here"
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                    />
                    <InputRightElement width="8rem" pr="0">
                        <Button colorScheme="purple" size="lg">
                            SEARCH
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <List
                    display={this.state.focused && this.state.suggestions.length > 0 ? "initial" : "none"}
                    mt="1px"
                    border="1px solid"
                    backgroundColor="white"
                    borderRadius="0 0 5px 5px"
                    borderColor="gray.200"
                    position="absolute"
                    width={["400px", "628px", "800px", "900px"]}>
                    {courseHeader}
                    {courseResults}
                    {showMoreResults}
                </List>

            </div>
        );
    }
}

export default SearchBar;
