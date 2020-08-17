import React from 'react';
import Bloodhound from 'corejs-typeahead';
import {
    Button,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from '@chakra-ui/core';
import {FaSearch} from 'react-icons/fa';
import SearchSuggestionList from './SearchSuggestionList';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.bloodhound = new Bloodhound({
            local: [],
            queryTokenizer: Bloodhound.tokenizers.nonword,
            datumTokenizer: Bloodhound.tokenizers.nonword,
            identify: course => {
                return course.code;
            },
            remote: {
                wildcard: ':query',
                url: '/api/course/search/:query',
                rateLimitWait: 0
            },
            indexRemote: true
        });

        this.suggestionMenu = React.createRef();

        this.state = {suggestions: [], focused: false};

        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(event) {
        this.bloodhound.search(event.target.value,
            () => {},
            // async request
            results => {
                this.setState({suggestions: results});
            });
    }

    onFocus() {
        this.setState({focused: true});
    }

    onBlur() {
        this.setState({focused: false});
    }

    render() {
        return (
            <div tabIndex="1"
                 style={{outline: "none"}}
                 onFocus={this.onFocus}
                 onBlur={this.onBlur}>
                <InputGroup size="lg" mt="2em">
                    <InputLeftElement children={<Icon as={FaSearch} color="gray.300" />} />
                    <Input placeholder="Search for a course..."
                        borderRadius={this.state.focused && this.state.suggestions.length > 0 ? "5px 5px 0 0" : "5px"}
                        borderWidth="2px"
                        focusBorderColor="purple.500"
                        aria-label="Search bar"
                        aria-describedby="Search for a class here"
                        onChange={this.onChange}
                    />
                    <InputRightElement width="8rem" pr="0">
                        <Button colorScheme="purple" size="lg">
                            SEARCH
                        </Button>
                    </InputRightElement>
                </InputGroup>

                {<SearchSuggestionList isOpen={this.state.focused} suggestions={this.state.suggestions} />}
            </div>
        );
    }
}

export default SearchBar;
