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

  const [courses, setCourses] = useState([])
  const [preferenceData, setPreferenceData] = useState([])
  const [userPrevCourses, setUserPrevCourses] = useState([])
  const [redirect, setRedirect] = useState(false)
  const navigate = useNavigate()

  // getting token from browser cookie
  const tokenCookie = document.cookie.match(/token=([^;]+)/)?.[1];
  // decoding jwt token to get og payloads
  const decodedToken = jwtDecode(tokenCookie);

  useEffect((() => {
    axios.get("http://localhost:4000/course/allAvilableCourse")
      .then((response) => {
        setCourses(response.data.courseDocs)
      })

    // getting loggedin user data
    const username = decodedToken.username
    axios.post("http://localhost:4000/auth/searchUser", { username })
      .then((response) => {
        // console.log(response.data.userDoc.prev_Taken_Courses)
        setUserPrevCourses(response.data.userDoc.prev_Taken_Courses)
      })
      .catch((error) => {
        console.log(error.message)
      })

  }), [])

  const onDragEnd = async (result) => {
    console.log("After Dragging Course ... ")
    console.log(result)

    let tobeSelected;
    let isDragged = courses;
    let selected = preferenceData;

    // incase destination !== preferenceData .. dont do anyhting
    if (result.destination.droppableId === null) {
      return;
    }

    // incase source === destination in all Available course colmn .. dont do anything
    if (result.source.droppableId === 'courses' && result.destination.droppableId === 'courses') {
      return;
    }

    // incase source === destination in pref input text field .. reorder
    if (result.source.droppableId === 'preferenceData' && result.destination.droppableId === 'preferenceData') {
      return;
    }

    // actual setting satte logic =-------------------------------------------------------------------

    // remove the dragged item from all Availbale courses shown in the side
    if (result.source.droppableId === 'courses') {
      tobeSelected = isDragged[result.source.index]
      isDragged.splice(result.source.index, 1)
    }
    // or remove it from the pref input and add back to all Availbale courses
    else {
      tobeSelected = selected[result.source.index]
      selected.splice(result.source.index, 1)
      isDragged.splice(result.source.index, 0, tobeSelected)
    }

    // adding courses in input text field of pref
    if (result.destination.droppableId === 'preferenceData') {
      console.log("hbfhjf")
      selected.splice(result.destination.index, 0, tobeSelected);
    }

    console.log("Selected courses ...")
    setPreferenceData(selected)
    // console.log(preferenceData)
  }

  const submitPrefernce = async () => {
    let allowSubmit = true
    // console.log("Previously Enrolled Courses ... ")
    // console.log(userPrevCourses)

    // if students new pref has prev_allicated_course --> error
    for (let element of preferenceData) {
      element = element.name
      if (userPrevCourses.includes(element)) {
        // console.log("Found Match !")
        allowSubmit = false;
      }
    }

    if (allowSubmit) {

      // getting pref names -> student_Pref_1, student_Pref_2
      const student_Pref = preferenceData.slice(0, 3)
      const student_Pref_1 = student_Pref[0].name;
      const student_Pref_2 = student_Pref[1].name;

      console.log(student_Pref_1, student_Pref_2)

      await axios.post("http://localhost:4000/course/setAllPref", { student_Pref_1, student_Pref_2 }, { withCredentials: true })
        .then((response) => {
          alert("Form Submitted Successfully !!")
          // console.log(response)
          setRedirect(true)
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
    else {
      alert("Course that you have selected has been allocated to you in previous semester.Choose a course which is not allocated Previously !!!!")
    }
  }

  if (redirect) {
    navigate("/dashboard")
  }

  return (
    <>
      <NavBar />

      <div className="fillchoice--outerdiv">
        <DragDropContext onDragEnd={onDragEnd}>

          <Droppable droppableId="courses">

            {(provided) => (
              <aside className="fillchoice--aside" {...provided.droppableProps} ref={provided.innerRef}>
                <ul className="fillchoice--ul">
                  {courses.map((course, index) => (

                    // console.log('hello')
                    <Draggable draggableId={course._id} index={index}>
                      {(provided) => (

                        <li className="fillchoice--li" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                          <img className={course.name.split(" ").length < 2 ? "fillchoice--li-img" : "fillchoice--li-img-two"} src={'http://localhost:4000/' + course.Imagefile || cookingImg} alt={course.name} />
                          <span className={course.name.split(" ").length < 2 ? "fillchoice--li-span" : "fillchoice--li-span-two"}>{course.name}</span>
                        </li>

                      )}
                    </Draggable>

                  ))}
                </ul>
                {provided.placeholder}
              </aside>
            )}

          </Droppable>

          <section className="fillchoice--section">
            <p className="block">
              Courses will be alloted on first come, first serve basis
            </p>

            <div className="fillchoice--div">
              <h4>Preference form</h4>

              <div>
                <label htmlFor="semid" className="fillchoice--label">
                  Sem
                </label>
                <input
                  type="number"
                  id="semid"
                  name="sem"
                  // onChange={handleChange}
                  // value={preferenceData.sem}
                  placeholder="SEM"
                  className="fillchoice--input"
                />
              </div>

              <p className="fillchoice--label">Enter 3 preferences</p>

              <Droppable droppableId="preferenceData">
                {(provided) => (
                  <div className="fillchoice--input preferences" {...provided.droppableProps} ref={provided.innerRef}>

                    {preferenceData && preferenceData.map((element, index) => {
                      if (preferenceData.length > 0) {
                        return (
                          <Draggable draggableId={element._id} index={index}>
                            {(provided) => (

                              <div
                                ref={provided.innerRef}
                                key={index}
                                className="fillchoice--li fillchoice-draggable-li"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >

                                <img className={element.name.split(" ").length < 2 ? "fillchoice--li-img" : "fillchoice--li-img-two"} src={'http://localhost:4000/' + element.Imagefile || cookingImg} alt="course cover image" />

                                <span className={element.name.split(" ").length < 2 ? "fillchoice--draggable-span" : "fillchoice--draggable-span-two"} >{element.name}</span>

                              </div>
                            )}
                          </Draggable>
                        );
                      }
                    }
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <button type="submit" className="fillchoice--button" onClick={submitPrefernce}>SUBMIT</button>
          </section>
        </DragDropContext >
      </div >
    </>
  );
}
