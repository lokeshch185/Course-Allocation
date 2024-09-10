import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import cookingImg from "../images/cooking.png";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function FillChoice(props) {
  const [courses, setCourses] = useState([]);
  const [preferenceData, setPreferenceData] = useState({
    sem: "",
    preference: [],
  });

  useEffect(() => {
    axios.get("http://localhost:4000/course/allAvilableCourse")
      .then((response) => {
        setCourses(response.data.courseDocs);
      })
      .catch((error) => {
        console.error("Error fetching courses: ", error);
      });
  }, []);

  const addCourseToPreference = (id) => {
    const data = courses.find((course) => String(id) === String(course._id));
    if (data) {
      setPreferenceData((prev) => ({
        ...prev,
        preference: [...prev.preference, data],
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
          <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="courses">
              {(provided) => (
                <aside
                  className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg border-l-4 border-slate-600"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h4 className="text-lg font-semibold mb-4 text-slate-800">
                    Available Courses
                  </h4>
                  <ul className="space-y-4">
                    {courses.map((course, index) => (
                      <Draggable
                        key={course._id}
                        draggableId={course._id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            className="flex items-center space-x-4 p-4 bg-slate-50 rounded-md shadow-sm"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <img
                              src={cookingImg}
                              alt="course-img"
                              className="w-12 h-12"
                            />
                            <span className="text-gray-700 text-lg">
                              {course.name}
                            </span>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                </aside>
              )}
            </Droppable>

            <section className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg border-l-4 border-slate-600">
              <h4 className="text-lg font-semibold mb-4 text-slate-800">
                Preference Form
              </h4>
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

              <Droppable droppableId="preferences">
                {(provided) => (
                  <div
                    className="space-y-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {preferenceData.preference.length > 0 ? (
                      preferenceData.preference.map((element, index) => (
                        <div
                          key={element._id}
                          className="p-4 bg-slate-50 rounded-md shadow-sm"
                        >
                          <span className="text-gray-700">
                            {element.name}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No preferences selected.</p>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <button
                type="submit"
                className="w-full mt-6 bg-slate-600 text-white py-2 rounded-md shadow-md hover:bg-slate-700"
              >
                Submit
              </button>
            </section>
          </DragDropContext>
        </div>
      </main>
    </>
  );
}
