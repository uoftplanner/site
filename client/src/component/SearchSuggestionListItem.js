import {ListIcon, ListItem, Text} from '@chakra-ui/core';
import {FaBook} from 'react-icons/fa/index';
import React from 'react';
import PropTypes from 'prop-types';

class SearchSuggestionListItem extends React.Component {
    render() {
        const code = this.props.code;
        const name = this.props.name;

        return (
            <ListItem display="flex" pt={3} pb={3} key={code} alignItems="center">
                <ListIcon as={FaBook} color="purple.500" width="22px" height="22px" ml={3} />
                <Text fontSize="lg" fontWeight="600" color="black">
                    {code + ' - ' + name}
                </Text>
            </ListItem>
        );
    }
}

SearchSuggestionListItem.propTypes = {
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default SearchSuggestionListItem;