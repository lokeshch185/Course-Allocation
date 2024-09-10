import React, { useEffect, useState } from "react";
import cookingImg from "../images/cooking.png";
import AdminNavBar from "./AdminNavbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AllCourses(props) {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/course/allCourse")
      .then((response) => {
        setCourses(response.data.courseDocs);
      })
      .catch((error) => {
        console.log("Error fetching courses:", error.message);
      });
  }, []);

  const allotCourseHandle = async (courseName) => {
    const name = courseName;
    await axios
      .post("http://localhost:4000/course/allotCourse", { name })
      .then((response) => {
        console.log(response);
        alert(`Students Alloted Course ${courseName} Successfully !!`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <AdminNavBar />

      <main className="allcourse--main flex flex-wrap justify-center p-6 gap-6 bg-gray-100">
        {courses.map((course) => (
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden w-72 h-96 transition-transform transform hover:scale-105 "
            key={course._id}
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
                Incharge: {course.prof_Incharge}
              </p>
              <hr className="mb-4" />
              <div className="flex justify-between">
                <Link
                  to={`/studentsenrolled/${course._id}`}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition-colors duration-300"
                >
                  Details
                </Link>
                <button
                  onClick={() => allotCourseHandle(course.name)}
                  className="bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600 transition-colors duration-300"
                >
                  Allot
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

