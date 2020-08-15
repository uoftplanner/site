import React from 'react';
import Bloodhound from 'corejs-typeahead';
import {
    Button,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Menu,
    MenuItem,
    MenuList
} from "@chakra-ui/core";

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

        this.state = {suggestions: [''], focused: false};

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
        this.setState({focused: false});
    }

    render() {

        return (
            <div>
                <InputGroup size="lg" mt="2em">
                    <InputLeftElement children={<Icon name="search" color="gray.300" />} />
                    <Input placeholder="Search for a course..."
                           borderWidth="2px"
                           focusBorderColor="purple.500"
                           aria-label="Search bar"
                           aria-describedby="Search for a class here"
                           onChange={this.onChange}
                           onFocus={this.onFocus}
                           //onBlur={this.onBlur}
                    />
                    <InputRightElement width="7rem">
                        <Button variantColor="purple" size="lg">
                            SEARCH
                        </Button>
                    </InputRightElement>
                 </InputGroup>

                <Menu>
                    <MenuList position="relative" top="0" right="0" isOpen={this.state.focused}>
                        {this.state.suggestions.map(suggestion => <MenuItem key={suggestion}>{suggestion}</MenuItem>)}
                    </MenuList>
                </Menu>
            </div>
        );
    }
}

export default SearchBar;
