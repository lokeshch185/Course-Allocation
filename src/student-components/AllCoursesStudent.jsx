import React , { useState , useEffect}from "react";
import { useNavigate } from "react-router-dom";
import cookingImg from "../images/cooking.png";
import addImg from "../images/add.png";
import updateImg from "../images/update.png";
import deleteImg from "../images/delete.png";
import NavBar from "../student-components/NavBar";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AllCoursesStudent(props) {

  const navigate = useNavigate();
  const [courses, setCourses] = useState([])

  useEffect((() => {
    axios.get("http://localhost:4000/course/allAvilableCourse")
      .then((response) => {
        setCourses(response.data.courseDocs)
      })
  }), [])

  function handleClick(id)
  {
     navigate(`/studentsenrolled/${id}`)
  }

  // const { courses } = props;

  return (
    <>
      <NavBar />
      {/* <div className="allcourse"> */}
        <main className="allcourse--main">
          {
            courses.map((course) => (
              <div className="allcourse--div" key={course._id} onClick= {()=>handleClick(course._id)}>
                <img className="student--allcourses-img"src={'http://localhost:4000/' + course.Imagefile || cookingImg} alt="course cover image" />
                <div className="allcourse--innerdiv spacing">
                  <hr />
                  <p className="bold">{course.name}</p>
                  <p>Intake capacity: {course.intake_Capacity}</p> 
                  <p>Current Enrolled: {course.current_Enrolled_Count}</p> 
                  <p>Incharge: {course.prof_Incharge}</p>
                  {/* <button><Link to={`/studentsenrolled/${course._id}`}>Course Details</Link></button> */}
                </div>
              </div>
            ))}
        </main>
      {/* </div> */}
    </>
  );
}
