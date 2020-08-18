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
import { FaSearch } from 'react-icons/fa';
import SearchSuggestionList from './SearchSuggestionList';

// TODO: arrow key controls
class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.bloodhound = new Bloodhound({
      local: [],
      queryTokenizer: Bloodhound.tokenizers.nonword,
      datumTokenizer: Bloodhound.tokenizers.nonword,
      identify: (course) => {
        return course.code;
      },
      remote: {
        wildcard: ':query',
        url: '/api/course/search/:query',
        rateLimitWait: 0,
      },
      indexRemote: true,
    });

    this.componentRef = React.createRef();

    this.state = { suggestions: [], focused: false };

    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick(event) {
    if (!this.componentRef.current.contains(event.target)) {
      this.setState({ focused: false });
    }
  }

  onChange(event) {
    this.bloodhound.search(
      event.target.value,
      () => {},
      // async request
      (results) => {
        this.setState({ suggestions: results });
      }
    );
  }

  onFocus() {
    this.setState({ focused: true });
  }

  render() {
    return (
      <div ref={this.componentRef}>
        <InputGroup size="lg" mt="2em">
          <InputLeftElement>
            <Icon as={FaSearch} color="gray.300" />
          </InputLeftElement>

          <Input
            onFocus={this.onFocus}
            onChange={this.onChange}
            placeholder="Search for a course..."
            borderRadius={
              this.state.focused && this.state.suggestions.length
                ? '5px 5px 0 0'
                : '5px'
            }
            borderWidth="2px"
            focusBorderColor="purple.500"
            aria-label="Search bar"
            aria-describedby="Search for a class here"
          />

          <InputRightElement width="8rem" pr="0">
            <Button colorScheme="purple" size="lg">
              SEARCH
            </Button>
          </InputRightElement>
        </InputGroup>

        <SearchSuggestionList
          isOpen={this.state.focused}
          suggestions={this.state.suggestions}
        />
      </div>
    );
  }
}

export default SearchBar;
