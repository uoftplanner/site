import React, {useEffect, useState} from 'react';
import Axios from 'axios';

function CoursePage(props) {
    const courseId = props.match.params.courseId;
    const [courseData, setcourseData] = useState(false);

    useEffect(() => {
        Axios.get(`/api/course/${courseId}`)
            .then(response => {
                if (response.status === 200) {
                    setcourseData(response.data);
                } else {
                    //TODO: redirect to 404 page or show error
                }
            });
    }, [courseId]);

    if (courseData) {
        return (
            <div>
                {courseData.Code}
                {courseData.Name}
                {courseData.Campus}
                {courseData.Term}
                {courseData.Description}
                {courseData.Prerequisites}
                {courseData.Corequisites}
                {courseData.Exclusions}
            </div>
        );
    } else {
        return (<div>Nothing yet...</div>);
    }
}

export default CoursePage
