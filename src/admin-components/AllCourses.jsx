import React, { useEffect, useState } from "react";
import cookingImg from "../images/cooking.png";
import addImg from "../images/add.png";
import updateImg from "../images/update.png";
import deleteImg from "../images/delete.png";
import AdminNavBar from "./AdminNavbar";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

export default function AllCourses(props) {

  const [courses, setCourses] = useState([])
  const navigate = useNavigate()

  useEffect((() => { 
    axios.get("http://localhost:4000/course/allCourse")
      .then((response) => {
        setCourses(response.data.courseDocs)
      })
  }), [])

  const allotCourseHandle = async (courseName) => {      
    const name = courseName
    await axios.post("http://localhost:4000/course/allotCourse" , {name})
    .then((response) => { 
      console.log(response)
      alert(`Students Alloted Course ${courseName} Successfully !!`)
    })
    .catch((error) => {
      console.log(error.message)
    })
  }

  // const { courses,image } = props;
  const { image } = props;

  return (
    <>
      < AdminNavBar />
   
        <main className="allcourse--main">
          {
            courses.map((course) => (
              <div className="allcourse--div" key={course._id}>
                <img className="allcourse--div-img"src={'http://localhost:4000/'+ course.Imagefile || cookingImg} alt="course cover image" />
                <div className="allcourse--innerdiv">
                  
                  <p className="bold">{course.name}</p>
                  <p>Intake capacity: {course.intake_Capacity}</p>
                  {/* <p>Current Enrolled : {course.current_Enrolled_Count}</p>  */}
                  <p>Incharge: {course.prof_Incharge}</p>
                  <hr />
                  <button ><Link to={`/studentsenrolled/${course._id}`}>Details</Link></button>
                  <button onClick={()=> allotCourseHandle(course.name)}>Allot</button>
                </div>
              </div>
            ))}
        </main>
    
    </>
  );
}
