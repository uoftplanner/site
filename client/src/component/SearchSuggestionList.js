import {List, Text} from '@chakra-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import SearchSuggestionListItem from './SearchSuggestionListItem';

const MAX_SUGGESTIONS = 5;

class SearchSuggestionList extends React.PureComponent {
  render() {
    const {isOpen} = this.props;
    const {suggestions} = this.props;

    if (!isOpen || suggestions.length === 0) {
      return null;
    }

    const hasMoreResults = suggestions.length - MAX_SUGGESTIONS > 0;

    return (
      <List
        mt="1px"
        paddingLeft="12px"
        paddingRight="12px"
        border="1px solid"
        backgroundColor="white"
        borderRadius="0 0 5px 5px"
        borderColor="gray.200"
      >
        <Text fontSize="sm" fontWeight="700" color="gray.400" ml={3} pt={3}>
          COURSES
        </Text>
        ;
        {suggestions.slice(0, MAX_SUGGESTIONS).map(suggestion => {
          return (
            <SearchSuggestionListItem
              key={suggestion.code}
              code={suggestion.code}
              name={suggestion.name}
            />
          );
        })}
        {hasMoreResults && (
          <Text fontSize="md" fontWeight="500" color="gray.500" ml={3} pb={3}>
            Show more ({suggestions.length - MAX_SUGGESTIONS} results)
          </Text>
        )}
      </List>
    );
  }
}

SearchSuggestionList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchSuggestionList;
