import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import cookingImg from "../images/cooking.png";
import Drag from "./Drag";
import { useDrop } from "react-dnd";
import axios from "axios";

export default function FillChoice(props) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/course/allAvilableCourse")
      .then((response) => {
        setCourses(response.data.courseDocs);
      })
      .catch((error) => {
        console.error("Error fetching courses: ", error);
      });
  }, []);

  const [preferenceData, setPreferenceData] = useState({
    sem: "",
    preference: [],
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "li",
    drop: (item) => addImageToDiv(item._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToDiv = (_id) => {
    const data = courses.find((course) => String(_id) === String(course._id));
    if (data) {
      setPreferenceData((prevPreferenceData) => ({
        ...prevPreferenceData,
        preference: [...prevPreferenceData.preference, data],
      }));
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setPreferenceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg border-l-4 border-slate-600">
            <h4 className="text-lg font-semibold mb-4 text-slate-800">
              Available Courses
            </h4>
            <ul className="space-y-4">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className="flex items-center space-x-4 p-4 bg-slate-50 rounded-md shadow-sm"
                >
                  <img
                    src={cookingImg}
                    alt="course-img"
                    className="w-12 h-12"
                  />
                  <span className="text-gray-700 text-lg">{course.name}</span>
                </li>
              ))}
            </ul>
          </aside>

          <section className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg border-l-4 border-slate-600">
            <p className="mb-4 text-gray-600">
              Courses will be allotted on a first-come, first-serve basis.
            </p>

            <div className="mb-6">
              <label htmlFor="semid" className="block text-gray-700 mb-2">
                Sem
              </label>
              <input
                type="number"
                id="semid"
                name="sem"
                value={preferenceData.sem}
                onChange={handleChange}
                placeholder="Enter Sem"
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-slate-600"
              />
            </div>

            <div
              ref={drop}
              className="bg-slate-50 p-4 rounded-md shadow-inner min-h-[150px]"
            >
              <h4 className="text-lg font-semibold mb-4 text-slate-800">
                Selected Preferences
              </h4>
              {preferenceData.preference.length > 0 ? (
                preferenceData.preference.map((element) => (
                  <Drag
                    key={element._id}
                    id={element._id}
                    name={element.name}
                  />
                ))
              ) : (
                <p className="text-gray-500">No preferences selected yet.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-slate-600 text-white py-2 rounded-md shadow-md hover:bg-slate-700"
            >
              Submit
            </button>
          </section>
        </div>
      </main>
    </>
  );
}
