import React from "react";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import cookingImg from "../images/cooking.png";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Drag from "./Drag";
import { useDrop } from "react-dnd";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function FillChoice(props) {
  const [courses, setCourses] = useState([]);
  const [preferenceData, setPreferenceData] = useState([]);
  const [userPrevCourses, setUserPrevCourses] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const tokenCookie = document.cookie.match(/token=([^;]+)/)?.[1];
  const decodedToken = jwtDecode(tokenCookie);

  useEffect(() => {
    axios.get("http://localhost:4000/course/allAvilableCourse").then((response) => {
      setCourses(response.data.courseDocs);
    });

    const username = decodedToken.username;
    axios
      .post("http://localhost:4000/auth/searchUser", { username })
      .then((response) => {
        setUserPrevCourses(response.data.userDoc.prev_Taken_Courses);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const onDragEnd = async (result) => {
    console.log("After Dragging Course ... ");
    console.log(result);

    let tobeSelected;
    let isDragged = courses;
    let selected = preferenceData;

    if (result.destination.droppableId === null) {
      return;
    }

    if (result.source.droppableId === "courses" && result.destination.droppableId === "courses") {
      return;
    }

    if (result.source.droppableId === "preferenceData" && result.destination.droppableId === "preferenceData") {
      return;
    }

    if (result.source.droppableId === "courses") {
      tobeSelected = isDragged[result.source.index];
      isDragged.splice(result.source.index, 1);
    } else {
      tobeSelected = selected[result.source.index];
      selected.splice(result.source.index, 1);
      isDragged.splice(result.source.index, 0, tobeSelected);
    }

    if (result.destination.droppableId === "preferenceData") {
      selected.splice(result.destination.index, 0, tobeSelected);
    }

    console.log("Selected courses ...");
    setPreferenceData(selected);
  };

  const submitPrefernce = async () => {
    let allowSubmit = true;

    for (let element of preferenceData) {
      element = element.name;
      if (userPrevCourses.includes(element)) {
        allowSubmit = false;
      }
    }

    if (allowSubmit) {
      const student_Pref = preferenceData.slice(0, 3);
      const student_Pref_1 = student_Pref[0].name;
      const student_Pref_2 = student_Pref[1].name;

      await axios
        .post(
          "http://localhost:4000/course/setAllPref",
          { student_Pref_1, student_Pref_2 },
          { withCredentials: true }
        )
        .then((response) => {
          alert("Form Submitted Successfully !!");
          setRedirect(true);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      alert(
        "Course that you have selected has been allocated to you in previous semester. Choose a course which is not allocated Previously !!!!"
      );
    }
  };

  if (redirect) {
    navigate("/dashboard");
  }

  return (
    <>
      <NavBar />

      <div className="grid grid-cols-[23%_77%] gap-4 p-4 bg-gray-200 max-h-screen">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="courses">
            {(provided) => (
              <aside
                className="bg-gray-200 p-4 rounded-lg h-full"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <ul className="flex flex-col items-center gap-2 p-0 m-0 list-none">
                  {courses.map((course, index) => (
                    <Draggable draggableId={course._id} index={index}>
                      {(provided) => (
                        <li
                          className="relative  list-none cursor-pointer  rounded-lg shadow-md flex items-center justify-center text-center"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <img
                            className={`${
                              course.name.split(" ").length < 2
                                ? "h-[6.5rem] w-[12.5rem]"
                                : "h-[6.3rem] w-[14.5rem]"
                            } rounded-sm brightness-75`}
                            src={"http://localhost:4000/" + course.Imagefile || cookingImg}
                            alt={course.name}
                          />
                          <span
                            className={`absolute bg-gray-200 rounded-xl p-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-900 font-extrabold z-10 text-sm`}
                          >
                            {course.name}
                          </span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                </ul>
                {provided.placeholder}
              </aside>
            )}
          </Droppable>

          <section className="flex flex-col items-center justify-center m-8 p-4 border border-gray-300 rounded-lg bg-sky-800">
            {/* <p className="font-bold text-black text-center text-lg">
              Courses will be alloted on first come, first serve basis
            </p> */}

            <div className="w-full max-w-[26rem] h-[30rem] m-2 p-4 bg-white border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center">
              <h4 className="font-bold text-lg text-center text-black mb-4">Preference form</h4>

              <div className="mb-4">
                <label htmlFor="semid" className="font-bold block mb-2 text-black">
                  Enter Current Semester:
                </label>
                <input
                  type="number"
                  id="semid"
                  name="sem"
                  placeholder="SEM"
                  className="p-2  max-w-[16rem] border bg-white text-black border-gray-300 rounded-md mb-4"
                />
              </div>

              <p className="font-bold text-black">Drop 3 preferences</p>

              <Droppable droppableId="preferenceData" >
                {(provided) => (
                  <div
                    className="flex flex-col items-center gap-2 p-4 bg-gray-200 mt-2 text-white rounded-lg w-1/2 min-h-40 "
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {preferenceData &&
                      preferenceData.map((element, index) => {
                        if (preferenceData.length > 0) {
                          return (
                            <Draggable draggableId={element._id} index={index}>
                              {(provided) => (
                                <div
                                  className="relative bg-white text-black p-2 border border-sky-200 rounded-lg shadow-md cursor-pointer"
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <span>{element.name}</span>
                                </div>
                              )}
                            </Draggable>
                          );
                        } else return null;
                      })}
                  </div>
                )}
              </Droppable>

              <button
                onClick={submitPrefernce}
                className="bg-orange-600 w-16 py-2 mt-4 text-white font-bold rounded-md hover:bg-orange-700 transition"
              >
                Submit
              </button>
            </div>
          </section>
        </DragDropContext>
      </div>
    </>
  );
}
