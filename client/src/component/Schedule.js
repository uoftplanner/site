import React from 'react';
import {Container, Text} from '@chakra-ui/core';
import PropTypes from 'prop-types';
import ScheduleActivity from './ScheduleActivity';

const thStyle = {
    padding: '15px 0',
    border: '2px solid #E8E8E8',
    borderStyle: 'solid none',
};

class Schedule extends React.Component {
    render() {
        const {activities} = this.props;

        if (!activities) {
            return null;
        }

        return (
            <Container centerContent maxW={1320}>
                <table bgcolor="white" width="100%" style={{textAlign: 'left', borderRadius:'8px'}}>
                    <thead>
                    <tr>
                        <Text as="th" padding="12px 0">COURSE SCHEDULE</Text>
                    </tr>

                    <tr>
                        <th style={thStyle}>Activity</th>
                        <th style={thStyle}>Day and Time</th>
                        <th style={thStyle}>Location</th>
                        <th style={thStyle}>Instructor</th>
                        <th style={thStyle}>Class Size</th>
                        <th style={thStyle}>Option to Waitlist</th>
                        <th style={thStyle}>Delivery Mode</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        activities.map(activity => {
                            return (
                                <ScheduleActivity key={activity.name} style={{padding: "10px 0"}}
                                                  activity={activity}/>
                            )
                        })
                    }
                    </tbody>
                </table>
            </Container>
        );
    }
}

Schedule.propTypes = {
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Schedule;
