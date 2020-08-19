import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import CourseHeader from '../component/CourseHeader';
import CourseDescription from '../component/CourseDescription';
import CourseInfoCard from '../component/CourseInfoCard';

function CoursePage(props) {
  const courseId = props.match.params.courseId;
  const [courseData, setcourseData] = useState(false);

  useEffect(() => {
    Axios.get(`/api/course/${courseId}`).then(response => {
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
          top="180px"
          right="61px"
          prerequisites={courseData.prerequisites}
          corequisites={courseData.corequisites}
          exclusions={courseData.exclusions}
        />

        <CourseHeader
          code={courseData.code}
          name={courseData.name}
          campus={courseData.campus}
          term={courseData.term}
        />

        <CourseDescription description={courseData.description} />

        {/*TODO: create schedule component */}
      </div>
    );
  } else {
    //TODO: add a loading view or skeleton placeholder
    return <div>Nothing yet...</div>;
  }
}

export default CoursePage;
