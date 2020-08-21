import React from 'react';
import {Box} from '@chakra-ui/core';
import PropTypes from 'prop-types';
import ScheduleActivity from './ScheduleActivity'

class Schedule extends React.Component {

    render() {
        const {activities} = this.props;

        if (!activities) {
            return null;
        }

        return (
            <Box>
                <table>
                    {
                        activities.map(activity => <ScheduleActivity activity={activity} />)
                    }
                </table>
            </Box>
        );
    }
}

Schedule.propTypes = {
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Schedule;
