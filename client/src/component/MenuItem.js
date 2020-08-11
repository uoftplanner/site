import React from 'react';
import Heading from '@chakra-ui/core/dist/Heading';

class MenuItem extends React.Component {

    render() {
        return (
            <Heading size="sm" marginRight={this.props.lastItem ? "0px" : "65px"}>
                {this.props.children}
            </Heading>
        );
    }
}

export default MenuItem;
