import React from 'react';
import Bloodhound from 'corejs-typeahead';
import {Input, Menu, MenuList} from "@chakra-ui/core";
import MenuItem from "./MenuItem";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.bloodhound = new Bloodhound({
            local: ['some', 'default', 'suggestions'],
            queryTokenizer: Bloodhound.tokenizers.ngram,
            datumTokenizer: Bloodhound.tokenizers.nonword,
            /*remote: {
                wildcard: ':query',
                url: 'http://localhost:3000/api/course/search/:query',
            }*/
        });

        this.suggestionMenu = React.createRef();

        this.state = {suggestions: [''], focused: false};

        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    onChange(event) {
        this.bloodhound.search(event.target.value, datums => {
            this.setState({suggestions: datums})
        }, datums => {
            this.setState({suggestions: datums})
        });
    }

    onFocus() {
        this.setState({focused: true});
    }

    render() {

        return (
            <div>
                <Input onChange={this.onChange} onFocus={this.onFocus} placeholder="Search for a course or professor" />

                <Menu>
                    <MenuList isOpen={this.state.focused}>
                        {this.state.suggestions.map(suggestion => <MenuItem key={suggestion.value}>{suggestion.value}</MenuItem>)}
                    </MenuList>
                </Menu>
            </div>
        );
    }
}

export default SearchBar;
