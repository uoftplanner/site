import {ListIcon, ListItem, Text} from '@chakra-ui/core';
import {Link} from 'react-router-dom';
import {FaBook} from 'react-icons/fa/index';
import React from 'react';
import PropTypes from 'prop-types';

class SearchSuggestionListItem extends React.PureComponent {
  render() {
    const {code} = this.props;
    const {name} = this.props;

    return (
      <ListItem
        _hover={{bg: '#F4F0F7'}}
        width="100%"
        borderRadius="8px"
        as={Link}
        to={`/course/${code}`}
        display="flex"
        pt={3}
        pb={3}
        key={code}
        alignItems="center"
      >
        <ListIcon as={FaBook} color="purple.500" width="22px" height="22px" ml={3} />
        <Text fontSize="lg" fontWeight="600" color="black">
          {code}
          &nbsp;
        </Text>
        <Text fontSize="lg" fontWeight="600" color="gray.500">
          —
        </Text>
        <Text fontSize="lg" fontWeight="400" color="gray.500">
          &nbsp;
          {name}
        </Text>
      </ListItem>
    );
  }
}

SearchSuggestionListItem.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SearchSuggestionListItem;
