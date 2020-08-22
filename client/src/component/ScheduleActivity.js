import React from 'react';
import PropTypes from 'prop-types';

class ScheduleActivity extends React.Component {

    render() {
        const {activity} = this.props;

        return (
            <tr>
                <td style={{padding: "10px 0"}}>{activity.name}</td>
                <td style={{padding: "10px 0"}}>{activity.dayAndTime}</td>
                <td style={{padding: "10px 0"}}>{activity.location}</td>
                <td style={{padding: "10px 0"}}>{activity.instructor}</td>
                <td style={{padding: "10px 0"}}>{activity.classSize}</td>
                {/*<td style={{padding: "10px 0"}}>{activity.enrolment}</td>*/}
                <td style={{padding: "10px 0"}}>{activity.waitlist ? "YES" : "NO"}</td>
                <td style={{padding: "10px 0"}}>{activity.delivery}</td>
            </tr>
        );
    }
}

ScheduleActivity.propTypes = {
    activity: PropTypes.object.isRequired,
};

export default ScheduleActivity;
