import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {Box} from '@chakra-ui/core'
import CourseHeader from '../component/CourseHeader';
import CourseDescription from '../component/CourseDescription';
import CourseInfoCard from '../component/CourseInfoCard';
import Schedule from '../component/Schedule'

function CoursePage(props) {
  const courseId = props.match.params.courseId;
  const [courseData, setcourseData] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#F4F4F4";

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
      <React.Fragment>
        <CourseHeader
          code={courseData.code}
          name={courseData.name}
          campus={courseData.campus}
          term={courseData.term}
        />

        <CourseInfoCard
          top="140px"
          right="61px"
          prerequisites={courseData.prerequisites}
          corequisites={courseData.corequisites}
          exclusions={courseData.exclusions}
        />

        <CourseDescription description={courseData.description} />

        <Box height="100%" p="27px 0">
            <Schedule activities={courseData.schedule} />
        </Box>
      </React.Fragment>
    );
  } else {
    //TODO: add a loading view or skeleton placeholder
    return <div>Nothing yet...</div>;
  }
}

export default CoursePage;
