import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import CourseHeader from '../component/CourseHeader';
import CourseDescription from '../component/CourseDescription';
import CourseInfoCard from '../component/CourseInfoCard';

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
                <CourseInfoCard
                    top="150px"
                    right="61px"
                    prerequisites={courseData.Prerequisites}
                    corequisites={courseData.Corequisites}
                    exclusions={courseData.Exclusions} />

                <CourseHeader
                    code={courseData.Code}
                    name={courseData.Name}
                    campus={courseData.Campus}
                    term={courseData.Term} />

                <CourseDescription description={courseData.Description} />

                {/*TODO: create schedule component */}
            </div>
        );
    } else {
        //TODO: add a loading view or skeleton placeholder
        return (<div>Nothing yet...</div>);
    }
}

export default CoursePage
