import React from 'react';
import PropTypes from 'prop-types';

class ScheduleActivity extends React.Component {

    render() {
        const {activity} = this.props;

        return (
            <tr>
                <td>{activity.name}</td>
                <td>{activity.dayAndTime}</td>
                <td>{activity.instructor}</td>
                <td>{activity.location}</td>
                <td>{activity.classSize}</td>
                <td>{activity.enrolment}</td>
                <td>{activity.waitlist}</td>
                <td>{activity.delivery}</td>
            </tr>
        );
    }
}

ScheduleActivity.propTypes = {
    activity: PropTypes.object.isRequired,
};

export default ScheduleActivity;
