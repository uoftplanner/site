import React from 'react';
import PropTypes from 'prop-types';

const tdStyle = {
    padding: '10px 0',
    paddingLeft: '15px',
}

class ScheduleActivity extends React.Component {

    render() {
        const {activity} = this.props;

        return (
            <tr>
                <td style={tdStyle}>{activity.name}</td>
                <td style={tdStyle}>{activity.dayAndTime}</td>
                <td style={tdStyle}>{activity.location}</td>
                <td style={tdStyle}>{activity.instructor}</td>
                <td style={tdStyle}>{activity.classSize}</td>
                {/*<td style={tdStyle}>{activity.enrolment}</td>*/}
                <td style={tdStyle}>{activity.waitlist ? "YES" : "NO"}</td>
                <td style={tdStyle}>{activity.delivery}</td>
            </tr>
        );
    }
}

ScheduleActivity.propTypes = {
    activity: PropTypes.object.isRequired,
};

export default ScheduleActivity;
