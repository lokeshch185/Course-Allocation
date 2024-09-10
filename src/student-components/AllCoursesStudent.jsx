import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookingImg from "../images/cooking.png";
import NavBar from "../student-components/NavBar";
import axios from "axios";

export default function AllCoursesStudent() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/course/allAvilableCourse")
      .then((response) => {
        setCourses(response.data.courseDocs);
      })
      .catch((error) => {
        console.log("Error fetching courses:", error.message);
      });
  }, []);

  function handleClick(id) {
    navigate(`/studentsenrolled/${id}`);
  }

  return (
    <>
      <NavBar />
      <main className="flex flex-wrap justify-center p-6 gap-6 bg-gray-200">
        {courses.map((course) => (
          <div
            className="bg-slate-100 rounded-lg shadow-lg overflow-hidden w-72 h-96 transition-transform transform hover:scale-105 cursor-pointer"
            key={course._id}
            onClick={() => handleClick(course._id)}
          >
            <img
              className="h-40 w-full object-cover"
              src={`http://localhost:4000/${course.Imagefile}` || cookingImg}
              alt="course cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {course.name}
              </h2>
              <p className="text-gray-600 mb-1">
                Intake Capacity: {course.intake_Capacity}
              </p>
              <p className="text-gray-600 mb-4">
                Current Enrolled: {course.current_Enrolled_Count}
              </p>
              <p className="text-gray-600 mb-4">
                Incharge: {course.prof_Incharge}
              </p>
              <hr className="mb-4" />
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
